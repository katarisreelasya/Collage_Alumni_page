import type { Request, Response } from "express";
import db from "../db/db";
import type { ResultSetHeader } from "mysql2"; 

// Add a meet with a deadline
export const addMeet = async (req: Request, res: Response) => {
  const { meet_link, title, description, date, time, deadline } = req.body;

  try {
    const query =
      "INSERT INTO meets (meet_link, title, description, date, time, deadline) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await db.query(query, [
      meet_link,
      title,
      description,
      date,
      time,
      deadline,
    ]);

    res.status(200).json({ result, message: "Session or meet added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a meet
export const deleteMeet = async (req: Request, res: Response) => {
  const { meet_id } = req.params;
  try {
    const query = "DELETE FROM meets WHERE meet_id = ?";
    const [result] = await db.query(query, [meet_id]);

    res.json("Meet removed successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all meets
export const getAllMeets = async (req: Request, res: Response) => {
  try {
    // Step 1: Delete completed meets
    const deleteQuery = `
      DELETE FROM meets 
      WHERE deadline < NOW();
    `;
    await db.query(deleteQuery);

    // Step 2: Fetch current and future meets
    const selectQuery = `
      SELECT * 
      FROM meets 
      WHERE deadline >= NOW()
      ORDER BY date ASC, time ASC;
    `;
    const [result] = await db.query(selectQuery);

    res.status(200).json(result);
  } catch (error: any) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit a meet by ID
export const editMeet = async (req: Request, res: Response) => {
  const { meet_id } = req.params;
  const { meet_link, title, description, date, time, deadline } = req.body;

  try {
    // SQL query to update the meet
    const query = `
      UPDATE meets
      SET meet_link = ?, title = ?, description = ?, date = ?, time = ?, deadline = ?
      WHERE meet_id = ?
    `;

    // Execute the query and cast the result to ResultSetHeader type
    const [result] = await db.query<ResultSetHeader>(query, [
      meet_link,
      title,
      description,
      date,
      time,
      deadline,
      meet_id,
    ]);

    // Check if any rows were affected (i.e., meet was updated)
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Meet updated successfully." });
    } else {
      res.status(404).json({ message: "Meet not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating meet", error });
  }
};