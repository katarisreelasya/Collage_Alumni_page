import db from "../db/db";
import type { Request, Response } from "express";

export const addEmploymentHistory = async (req: Request, res: Response) => {
  const {
    organization,
    designation,
    
    department,
    experience_years,
    
    work_phone,
    work_email,
  } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const { login_id: alumni_id } = req.user;
  try {
    const query = `INSERT INTO employment_history 
        (alumni_id,organization,designation, department, experience_years,work_phone, work_email, created_at) 
        VALUES (?,?, ?, ?, ?, ?, ?, NOW())`;

    const [result] = await db.query(query, [
      alumni_id,
      organization,
      designation,
      department,
      experience_years,
      work_phone,
      work_email,
    ]);

    res
      .status(201)
      .json({ message: "Employment history added successfully", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding employment history", error: err });
  }
};
// idEmployment_id
export const updateEmploymentHistory = async (req: Request, res: Response) => {
  const { idEmployment_id } = req.params; // Updated to match route parameter
  const {
    organization,
    designation,
    department,
    experience_years,
    work_phone,
    work_email,
  } = req.body;

  try {
    const query = `
      UPDATE employment_history 
      SET 
        organization = ?, 
        designation = ?, 
        department = ?, 
        experience_years=?,
        work_phone = ?, 
        work_email = ? 
      WHERE idEmployment_id = ? AND alumni_id = ?
    `;

    const [result] = await db.query(query, [
      organization,
      designation,
      department,
      experience_years,

      work_phone,
      work_email,
      idEmployment_id, // Updated to use emp_id from route parameter
      req.user?.login_id, // Ensure alumni_id is correctly set to the logged-in user’s ID
    ]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Employment history not found or not authorized" });
    }

    res.status(200).json({ message: "Employment history updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating employment history", error: err });
  }
};



export const deleteEmploymentHistory = async (req: Request, res: Response) => {
  const { idEmployment_id } = req.params;

  try {
    const query = `DELETE FROM employment_history WHERE idEmployment_id = ? AND alumni_id = ?`;

    const [result] = await db.query(query, [
      idEmployment_id,
      req.user?.login_id,
    ]);

    if ((result as any[]).length === 0) {
      return res
        .status(404)
        .json({ message: "Employment history not found or not authorized" });
    }

    res
      .status(200)
      .json({ message: "Employment history deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting employment history", error: err });
  }
};

export const getJobDetails = async (req: Request, res: Response) => {
  const { alumni_id } = req.params;

  try {
    const query = `SELECT * FROM employment_history WHERE alumni_id = ?`;
    const [results] = await db.query(query, [alumni_id]);

    if ((results as any[]).length === 0) {
      return res
        .status(200)
        .json({ message: "No job experiences found", data: [] });
    }

    res
      .status(200)
      .json({ message: "Job experiences fetched successfully", data: results });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching job experiences", error: err });
  }
};
