import type { Request, Response } from "express";
import db from "../db/db";
import type { ResultSetHeader } from "mysql2";

// Add a new webinar to the database
export const addWebinar = async (req: Request, res: Response) => {
  const { web_title, description, time, date, deadline } = req.body;
  const createdAt = new Date(); 

  if (!web_title || !description || !time || !date || !deadline) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO webinar (web_title, description, time, date, createdAt, deadline)
      VALUES (?, ?, ?, ?, NOW(), ?)
    `;

    const [result] = await db.query<ResultSetHeader>(query, [
      web_title,
      description,
      time,
      date,
      createdAt,
      deadline,
    ]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Webinar added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add webinar" });
    }
  } catch (error) {
    console.error("Error adding webinar:", error);
    res.status(500).json({ message: "Error adding webinar", error });
  }
};

// Get all webinars
export const getWebinars = async (req: Request, res: Response) => {
  try {
    // Query to delete completed webinars
    const deleteQuery = `DELETE FROM webinar WHERE deadline < NOW()`;
    await db.query(deleteQuery);

    // Query to fetch current and future webinars
    const selectQuery = `SELECT * FROM webinar WHERE deadline >= NOW() ORDER BY date, time`;
    const [webinars] = await db.query(selectQuery);

    res.status(200).json(webinars);
  } catch (error) {
    console.error("Error fetching webinars:", error);
    res.status(500).json({ message: "Error fetching webinars", error });
  }
};


// Update a webinar by ID
export const updateWebinar = async (req: Request, res: Response) => {
  const webId = req.params.web_id;
  const { web_title, description, time, date, deadline } = req.body;

  if (!webId) {
    return res.status(400).json({ message: "Webinar ID is required" });
  }

  try {
    const query = `
      UPDATE webinar
      SET web_title = ?, description = ?, time = ?, date = ?, deadline = ?
      WHERE web_id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(query, [
      web_title,
      description,
      time,
      date,
      deadline,
      webId,
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Webinar updated successfully!" });
    } else {
      res.status(404).json({ message: "Webinar not found!" });
    }
  } catch (error) {
    console.error("Error updating webinar:", error);
    res.status(500).json({ message: "Failed to update webinar", error });
  }
};

// Delete a webinar by ID
export const deleteWebinar = async (req: Request, res: Response) => {
  const webId = req.params.web_id;

  if (!webId) {
    return res.status(400).json({ message: "Webinar ID is required" });
  }

  try {
    const query = `DELETE FROM webinar WHERE web_id = ?`;
    const [result] = await db.query<ResultSetHeader>(query, [webId]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Webinar deleted successfully!" });
    } else {
      res.status(404).json({ message: "Webinar not found!" });
    }
  } catch (error) {
    console.error("Error deleting webinar:", error);
    res.status(500).json({ message: "Failed to delete webinar", error });
  }
};
