import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db/db'; // Make sure this is the correct path to your DB connection
import type { RowDataPacket } from 'mysql2/promise';

/**
 * Updates the user's password in the login table.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} - JSON response indicating success or failure.
 */
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { user_id, new_password, old_password } = req.body;

  try {
    // Step 1: Retrieve current hashed password for verification
    const getPasswordQuery = 'SELECT password_hash FROM login WHERE user_id = ?';
    const [rows] = await db.query<RowDataPacket[]>(getPasswordQuery, [user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentHashedPassword = rows[0].password_hash;

    // Step 2: Verify old password matches the existing password hash
    const isMatch = await bcrypt.compare(old_password, currentHashedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Step 3: Hash the new password
    const newHashedPassword = await bcrypt.hash(new_password, 10);

    // Step 4: Update password in the database
    const updatePasswordQuery = 'UPDATE login SET password_hash = ? WHERE user_id = ?';
    await db.query(updatePasswordQuery, [newHashedPassword, user_id]);

    return res.status(200).json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Failed to update password', error });
  }
};
