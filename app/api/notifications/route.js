import { query } from '../../../utils/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notifications = await query(
        'SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10'
      );
      
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Mark notification as read
    const { id } = req.body;
    
    try {
      await query(
        'UPDATE notifications SET is_read = 1 WHERE id = ?',
        [id]
      );
      
      res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error updating notification:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}