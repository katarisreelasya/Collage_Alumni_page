import type { Request, Response } from "express";
import db from "../db/db"; // Import the database connection

export const getAlumniRequestsCount = async (req: Request, res: Response) => {
  try {
    const query = "SELECT COUNT(*) AS alumniRequestsCount FROM alumni_registration_requests"; // Query to count rows in alumni_registration_requests
    const [results] = await db.query(query);
    const alumniRequestsCount = (results as any[])[0].alumniRequestsCount;

    res.json({ alumniRequestsCount }); // Respond with the count
  } catch (error) {
    console.error("Error fetching alumni registration requests count:", error);
    res.status(500).json({ error: "Error fetching alumni registration requests count" });
  }
};
