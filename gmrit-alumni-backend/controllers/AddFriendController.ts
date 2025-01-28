import type { Request, Response } from "express";
import db from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { sendEmail } from "../utils/sendMail";
import { emailTextFriendAdded } from "../utils/emailTexts1";

interface User {
  login_id: string;
}

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  const { friend_id } = req.body;

  if (!req.user || !(req.user as User).login_id) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  const { login_id } = req.user as User;

  try {
    // Step 1: Check if the friend is already added for the alumni
    const checkExistingFriendQuery = `
      SELECT 1 
      FROM friends 
      WHERE friend_id = ? AND alumni_id = ?
    `;

    const [existingRows]: [RowDataPacket[], unknown] = await db.query(checkExistingFriendQuery, [friend_id, login_id]);

    if (existingRows.length > 0) {
      res.status(409).json({ message: "Friend is already added" });
      return;
    }

    // Step 2: Fetch friend details from alumnidetails
    const selectFriendQuery = `
      SELECT mail_id AS friend_mail, 
             phone_no AS friend_phno, 
             name_of_the_alumni AS friend_name, 
             current_location AS friend_loc, 
             branch AS friend_branch
      FROM alumnidetails 
      WHERE login_id = ?
    `;

    const [friendRows]: [RowDataPacket[], unknown] = await db.query(selectFriendQuery, [friend_id]);

    if (friendRows.length === 0) {
      res.status(404).json({ message: "Friend not found" });
      return;
    }

    const friendDetails = friendRows[0];

    // Step 3: Fetch the current alumni's name to include in the email
    const selectAlumniNameQuery = `
      SELECT name_of_the_alumni 
      FROM alumnidetails 
      WHERE login_id = ?
    `;

    const [alumniRows]: [RowDataPacket[], unknown] = await db.query(selectAlumniNameQuery, [login_id]);

    if (alumniRows.length === 0) {
      res.status(404).json({ message: "Alumni not found" });
      return;
    }

    const alumniName = alumniRows[0].name_of_the_alumni;

    // Step 4: Insert into friends table
    const insertQuery = `
      INSERT INTO friends 
      (friend_id, alumni_id, friend_mail, friend_branch, friend_phno, friend_loc, friend_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result]: [ResultSetHeader, unknown] = await db.query(insertQuery, [
      friend_id,
      login_id,
      friendDetails.friend_mail,
      friendDetails.friend_branch,
      friendDetails.friend_phno,
      friendDetails.friend_loc,
      friendDetails.friend_name,
    ]);

    // Step 5: Prepare email options
    const mailOptions = {
      to: friendDetails.friend_mail,
      subject: "Alumni Registration Approved",
      text: emailTextFriendAdded(
        alumniName, // The alumni name as the first argument
        login_id,   // JNTU ID
        friendDetails.friend_name, // Friend's name
        friend_id   // Friend's JNTU ID
      ),
    };

    // Send email (ensure you have an email sending mechanism in place)
    await sendEmail(mailOptions);

    res.status(201).json({
      message: "Friend added successfully",
      friendId: result.insertId,
    });
  } catch (err: unknown) {
    // Handle any errors
    const errorMessage = (err as any).message || "Unknown error";
    console.error(err);
    res.status(500).json({
      message: "Error adding friend",
      error: errorMessage,
    });
  }
};

  

export const getFriends = async (req: Request, res: Response): Promise<void> => {
  const { login_id } = req.params; // Get login_id from URL parameters

  try {
    // Query to get friends based on alumni_id (login_id)
    const selectQuery = `
      SELECT friend_id, alumni_id, friend_mail, friend_branch, friend_phno, friend_loc, friend_name
      FROM friends
      WHERE alumni_id = ?
    `;

    const [rows]: [RowDataPacket[], unknown] = await db.query(selectQuery, [login_id]);

    if (rows.length === 0) {
      res.status(404).json({ message: "No friends found" });
      return;
    }

    res.status(200).json({
      message: "Friends retrieved successfully",
      friends: rows,
    });
  } catch (err: unknown) {
    const errorMessage = (err as any).message || "Unknown error";
    console.error(err);
    res.status(500).json({
      message: "Error retrieving friends",
      error: errorMessage,
    });
  }
};


// Method to delete a friend using friend_id and alumni_id (login_id)
export const deleteFriend = async (req: Request, res: Response): Promise<Response> => {
    const { friend_id } = req.params; // Get friend_id from URL parameters
  
    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    // Extract login_id from the authenticated user (req.user)
    const { login_id } = req.user; 
  
    // Log the values for debugging
    console.log("Friend ID:", friend_id);
    console.log("Alumni ID (Login ID):", login_id);
  
    try {
      // SQL query to delete a friend based on friend_id and alumni_id (login_id)
      const query = `
      DELETE FROM friends 
      WHERE friend_id = ? AND alumni_id = ?
    `;
  
      // Execute the query
      const [result]: any = await db.query(query, [friend_id, login_id]);
  
      // Check if any row was affected (i.e., if the deletion was successful)
      if (result.affectedRows === 0) {
        return res.status(403).json({
          message: "You can only delete your own friends.",
        });
      }
  
      // Respond with a success message
      return res.status(200).json({
        message: "Friend deleted successfully",
      });
    } catch (err) {
      // Handle errors (e.g., database errors)
      return res.status(500).json({
        message: "Error deleting friend",
        error: (err as Error).message || "Unknown error",
      });
    }
  };
  

