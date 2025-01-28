import type{ Request, Response } from "express";
import db from "../db/db";

// Function to add a new college event
export const addClgEvent = async (req: Request, res: Response) => {
  try {
    const { post_title, post_description, post_images, post_date, post_time } = req.body;

    // Validating the input
    if (!post_title || !post_description || !post_date || !post_time) {
      return res.status(400).json({ error: "All fields are required except images" });
    }

    // Validating post_images length
    if (post_images && Array.isArray(post_images) && post_images.length > 8) {
      return res.status(400).json({ error: "You can upload a maximum of 8 images" });
    }

    // Preparing the SQL query
    const query = `
      INSERT INTO clg_events (post_title, post_description, post_images, post_date, post_time)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Executing the query
    await db.execute(query, [
      post_title,
      post_description,
      JSON.stringify(post_images || []), // Convert images to JSON string if provided
      post_date,
      post_time,
    ]);

    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
