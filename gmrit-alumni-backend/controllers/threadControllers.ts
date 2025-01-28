import type { Request, Response } from "express";
import db from "../db/db"; // Import your database connection

// Create a new thread
export const createThread = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const query = `
    INSERT INTO Threads (thread_id, title, content, alumni_id, created_at, updated_at)
    VALUES (UUID(), ?, ?, ?, NOW(), NOW());
  `;

  try {
    await db.execute(query, [title, content, req.user?.login_id]);
    res.status(201).json({ message: "Thread created successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to create thread :${error}` });
  }
};

// Get all threads
export const getAllThreads = async (req: Request, res: Response) => {
  const query = `SELECT * FROM Threads`;

  try {
    const [threads] = await db.query(query);
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve threads" });
  }
};

// Get a specific thread by ID
export const getThreadById = async (req: Request, res: Response) => {
  const { thread_id } = req.params;
  const query = `SELECT * FROM Threads WHERE thread_id = ?`;

  try {
    const [thread] = await db.query(query, [thread_id]);
    if (!(thread as any[]).length) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json((thread as any[])[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve thread" });
  }
};
