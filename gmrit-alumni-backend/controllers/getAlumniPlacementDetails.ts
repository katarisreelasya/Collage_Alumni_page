import type { Request, Response } from "express";
import db from "../db/db"; // Adjust the import path according to your project structure

export const getAlumniPlacementDetails = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;
  const branch = req.query.branch as string;
  const name = req.query.name as string;
  const location = req.query.current_location as string;
  const company = req.query.company as string;
  const sortField = (req.query.sortField as string) || ""; // e.g., 'name', 'graduationYear', 'branch'
  const sortOrder = (req.query.sortOrder as string) || "ASC"; // e.g., 'ASC' or 'DESC'

  // Parse `passed` as an integer, ensuring it's only defined if it’s a valid number
  const passedYear = req.query.passed ? parseInt(req.query.passed as string, 10) : undefined;

  try {
    let baseQuery =
      "SELECT * FROM alumnidetails WHERE company IS NOT NULL AND LENGTH(company) > 2";
    let countQuery =
      "SELECT COUNT(*) as total FROM alumnidetails WHERE company IS NOT NULL AND LENGTH(company) > 2";

    const queryParams: (string | number)[] = [];
    const countQueryParams: (string | number)[] = [];

    // Filtering conditions for both the main query and the count query
    if (passedYear) {
      baseQuery += " AND passed = ?";
      countQuery += " AND passed = ?";
      queryParams.push(passedYear);
      countQueryParams.push(passedYear);
    }
    if (branch) {
      baseQuery += " AND branch = ?";
      countQuery += " AND branch = ?";
      queryParams.push(branch);
      countQueryParams.push(branch);
    }
    if (name) {
      baseQuery += " AND name_of_the_alumni LIKE ?";
      countQuery += " AND name_of_the_alumni LIKE ?";
      queryParams.push(`%${name}%`);
      countQueryParams.push(`%${name}%`);
    }
    if (location) {
      baseQuery += " AND current_location LIKE ?";
      countQuery += " AND current_location LIKE ?";
      queryParams.push(`%${location}%`);
      countQueryParams.push(`%${location}%`);
    }
    if (company) {
      baseQuery += " AND company LIKE ?";
      countQuery += " AND company LIKE ?";
      queryParams.push(`%${company}%`);
      countQueryParams.push(`%${company}%`);
    }

    // Sorting logic
    if (sortField) {
      baseQuery += ` ORDER BY ${sortField} ${sortOrder === "DESC" ? "DESC" : "ASC"}`;
    }

    // Pagination
    baseQuery += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    // Execute the main query for paginated results
    const [results] = await db.query(baseQuery, queryParams);

    // Execute the count query to calculate the total number of rows that match the filtering criteria
    const [countResult] = await db.query(countQuery, countQueryParams);
    const totalRows = (countResult as any[])[0].total;

    // Send the response with the paginated results and total pages
    const result = {
      alumni: results as any[],
      totalPages: Math.ceil(totalRows / limit), // Calculate total pages based on filtered row count
      totalAlumni: totalRows, // Optionally return total number of matching rows
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching alumni placement details:", error);
    res.status(500).json({ error: "Error fetching alumni placement details" });
  }
};
