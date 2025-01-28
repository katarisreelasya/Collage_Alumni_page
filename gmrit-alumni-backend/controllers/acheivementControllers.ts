import type { Request, Response } from "express";
import db from "../db/db";

// Create a new achievement
export const addAchievement = async (req: Request, res: Response) => {
  const { title, description, achievement_date } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const { login_id } = req.user;
  try {
    const query = `INSERT INTO achievements (title, description,  achievement_date, alumni_id, created_at)
                   VALUES ( ?, ?, ?, ?, NOW())`;

    const [result] = await db.query(query, [
      title,
      description,

      achievement_date,
      login_id,
    ]);

    res.status(201).json({
      message: "Achievement added successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding achievement",
      error: err,
    });
  }
};

// Update an existing achievement by alumni_id and achievement_id
export const updateAchievement = async (req: Request, res: Response) => {
  const { achievement_id } = req.params; // Achievement ID from URL params
  const { title, description, achievement_date } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const { login_id } = req.user;
  try {
    const query = `UPDATE achievements 
                     SET title = ?, description = ?,  achievement_date = ? 
                     WHERE achievement_id = ? AND alumni_id = ?`;

    const [result] = await db.query(query, [
      title,
      description,
      achievement_date,
      achievement_id,
      login_id,
    ]);

    if ((result as any[]).length === 0) {
      return res.status(403).json({
        message: "You can only update your own achievements.",
      });
    }

    res.status(200).json({
      message: "Achievement updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating achievement",
      error: err,
    });
  }
};
// Delete an achievement by alumni_id and achievement_id
export const deleteAchievement = async (req: Request, res: Response) => {
  const { achievement_id } = req.params;
  // Achievement ID from URL params
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const { login_id } = req.user;

  // Update authorization logic
  // if (req.user.role !== "admin" && req.user.login_id !== req.params.login_id) {
  //   return res.status(403).json({ message: "Access denied" });
  // }

  try {
    const query = `DELETE FROM achievements WHERE achievement_id = ? AND alumni_id = ?`;

    const [result] = await db.query(query, [achievement_id, login_id]);

    if ((result as any[]).length === 0) {
      return res.status(403).json({
        message: "You can only delete your own achievements.",
      });
    }

    res.status(200).json({
      message: "Achievement deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting achievement",
      error: err,
    });
  }
};

export const getAchievements = async (req: Request, res: Response) => {
  const { login_id } = req.params;
  try {
    const query = `SELECT * FROM achievements WHERE alumni_id = ?`;
    console.log(query, login_id);

    const [result] = await db.query(query, [login_id]);

    res.status(200).json({
      message: "Achievements fetched successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching achievements",
      error: err,
    });
  }
};
