import { query } from '../../../utils/database';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { hospitalName, receiverName, receiverTitle, serialNumbers } = req.body;

  try {
    // Start a transaction
    await query('START TRANSACTION');

    // Update each dosimetry status to received
    for (const serialNumber of serialNumbers) {
      await query(
        `UPDATE dosimetries 
         SET status = 'received', received_at = NOW(), 
             hospital_name = ?, received_by = ?, receiver_title = ?
         WHERE serial_number = ?`,
        [hospitalName, receiverName, receiverTitle, serialNumber]
      );
    }

    // Create a notification for CHAK
    await query(
      'INSERT INTO notifications (type, message, is_read) VALUES (?, ?, ?)',
      ['reception', `${hospitalName} has received ${serialNumbers.length} dosimetries. Receiver: ${receiverName} (${receiverTitle})`, 0]
    );

    await query('COMMIT');

    res.status(200).json({ 
      message: 'Dosimetries received successfully',
      receivedCount: serialNumbers.length
    });
  } catch (error) {
    await query('ROLLBACK');
    console.error('Error receiving dosimetries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}