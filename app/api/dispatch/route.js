import { query } from '../../../utils/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { hospital, address, contactPerson, contactPhone, dosimetries } = req.body;

  try {
    // Start a transaction
    await query('START TRANSACTION');

    // Create a new shipment
    const shipmentResult = await query(
      `INSERT INTO shipments (destination, address, contact_person, contact_phone, status) 
       VALUES (?, ?, ?, ?, 'dispatched')`,
      [hospital, address, contactPerson, contactPhone]
    );

    const shipmentId = shipmentResult.insertId;

    // Add each dosimetry to the database and link to shipment
    for (const serialNumber of dosimetries) {
      // Check if dosimetry already exists
      const existingDosimetry = await query(
        'SELECT id FROM dosimetries WHERE serial_number = ?',
        [serialNumber]
      );

      if (existingDosimetry.length > 0) {
        // Update existing dosimetry
        await query(
          `UPDATE dosimetries 
           SET status = 'dispatched', dispatched_at = NOW(), hospital_name = ?
           WHERE serial_number = ?`,
          [hospital, serialNumber]
        );
        
        // Link to shipment
        await query(
          'INSERT INTO shipment_dosimetries (shipment_id, dosimetry_id) VALUES (?, ?)',
          [shipmentId, existingDosimetry[0].id]
        );
      } else {
        // Insert new dosimetry
        const dosimetryResult = await query(
          `INSERT INTO dosimetries (serial_number, status, hospital_name, dispatched_at) 
           VALUES (?, 'dispatched', ?, NOW())`,
          [serialNumber, hospital]
        );
        
        // Link to shipment
        await query(
          'INSERT INTO shipment_dosimetries (shipment_id, dosimetry_id) VALUES (?, ?)',
          [shipmentId, dosimetryResult.insertId]
        );
      }
    }

    // Create a notification
    await query(
      'INSERT INTO notifications (type, message, is_read) VALUES (?, ?, ?)',
      ['dispatch', `New shipment dispatched to ${hospital} with ${dosimetries.length} dosimetries`, 0]
    );

    await query('COMMIT');

    res.status(200).json({ 
      message: 'Dosimetries dispatched successfully',
      shipmentId: shipmentId,
      dispatchedCount: dosimetries.length
    });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error dispatching dosimetries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}