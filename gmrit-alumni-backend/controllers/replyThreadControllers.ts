import type { Request, Response } from "express";
import db from "../db/db"; // Import your database connection

// Create a reply for a specific thread
export const createReply = async (req: Request, res: Response) => {
  const { thread_id } = req.params;
  const { content } = req.body;

  const query = `
    INSERT INTO Replies (reply_id, thread_id, alumni_id, content, created_at, updated_at)
    VALUES (UUID(), ?, ?, ?, NOW(), NOW());
  `;

  try {
    await db.execute(query, [thread_id, req.user?.login_id, content]);
    res.status(201).json({ message: "Reply created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create reply" });
  }
};

// Get all replies for a specific thread
export const getRepliesByThread = async (req: Request, res: Response) => {
  const { thread_id } = req.params;
  const query = `SELECT * FROM Replies WHERE thread_id = ?`;

  try {
    const [replies] = await db.query(query, [thread_id]);
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve replies" });
  }
};
