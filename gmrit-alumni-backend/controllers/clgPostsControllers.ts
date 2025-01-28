import type { Request, Response } from "express";
import path from "path";
import express from "express";
import db from "../db/db";

// Initialize the Express router
const router = express.Router();

// Directory to store images
const IMAGES_DIRECTORY = path.join(__dirname, "../images");

// Function to view all college events
export const viewClgEvents = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM clg_events");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to view a single college event by ID
export const viewSingleClgEvent = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM clg_events WHERE post_id = ?", [post_id]);
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json((rows as any[])[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to edit/update a college event
export const editClgEvent = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const { post_title, post_description, post_images, post_date, post_time } = req.body;

  try {
    // Validating the input
    if (!post_title || !post_description || !post_date || !post_time) {
      return res.status(400).json({ error: "All fields are required except images" });
    }

    // Validating post_images length
    if (post_images && Array.isArray(post_images) && post_images.length > 8) {
      return res.status(400).json({ error: "You can upload a maximum of 8 images" });
    }

    // Extracting the date part from the post_date
    const formattedDate = new Date(post_date).toISOString().split("T")[0]; // 'YYYY-MM-DD'

    // Updating the event
    const query = `
      UPDATE clg_events 
      SET post_title = ?, post_description = ?, post_images = ?, post_date = ?, post_time = ? 
      WHERE post_id = ?
    `;
    const [result] = await db.execute(query, [
      post_title,
      post_description,
      JSON.stringify(post_images || []), // Convert images to JSON string if provided
      formattedDate, // Use the formatted date
      post_time,
      post_id,
    ]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a college event
export const deleteClgEvent = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM clg_events WHERE post_id = ?", [post_id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to fetch an image
export const fetchImage = (req: Request, res: Response) => {
  const { image } = req.params;
  const imagePath = path.join(IMAGES_DIRECTORY, image);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Error sending image:", err);
      res.status(404).json({ error: "Image not found" });
    }
  });
};


