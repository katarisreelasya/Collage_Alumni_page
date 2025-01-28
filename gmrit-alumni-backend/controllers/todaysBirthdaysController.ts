import type { Request, Response } from "express";
import db from "../db/db"; // Your database connection

// Controller to get today's birthdays
export const getTodaysBirthdays = async (req: Request, res: Response) => {
  try {
    // Get the current date in "MM-DD" format
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    const todayFormatted = `${month}-${day}`;

    // Query to fetch students with today's birthdays
    const query = `
      SELECT 
        name_of_the_alumni AS name, 
        branch, 
        dob ,
        login_id
      FROM alumnidetails 
      WHERE DATE_FORMAT(dob, '%m-%d') = ?;
    `;

    const [results]: any = await db.execute(query, [todayFormatted]);

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json({ message: "No birthdays today." });
    }
  } catch (error) {
    console.error("Error fetching today's birthdays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
