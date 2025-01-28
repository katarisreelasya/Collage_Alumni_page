import type { Request, Response } from "express";
import db from "../db/db";

// 1. Create a Job Listing
export const createJobListing = async (req: Request, res: Response) => {
  const {
    Company,
    position,
    description,
    requirements,
    application_deadline,
    posting_date,
    job_link, // job_link field added
  } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { login_id, role } = req.user; // Get user info from middleware
  console.log(login_id, role, req.user, "this is req user");

  try {
    // Default alumni_id or admin_id based on the role
    const creator_id = role === "admin" ? "admin" : login_id;

    // Updated query: added job_link column
    const query = `INSERT INTO joblistings (alumni_id, Company, position, description, requirements, application_deadline, posting_date, job_link) 
                   VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)`;

    const [result] = await db.query(query, [
      creator_id,
      Company,
      position,
      description,
      requirements,
      application_deadline,
      posting_date,
      job_link, // Added job_link to values array
    ]);

    res
      .status(201)
      .json({ message: "Job listing created successfully", result: result });
  } catch (err) {
    res.status(500).json({ message: "Error creating job listing", error: err });
  }
};

// 2. Get Job Listings
export const getJobListings = async (req: Request, res: Response) => {
  const { job_id } = req.params;

  try {
    // // Step 1: Delete expired job listings where the application deadline has passed
    // const deleteQuery = `
    //   DELETE FROM joblistings
    //   WHERE application_deadline < NOW()
    // `;
    // await db.query(deleteQuery);

    // Step 2: Prepare the query to retrieve active job listings
    let query = `SELECT * FROM joblistings WHERE application_deadline >= NOW()`;
    let queryParams: any[] = [];

    // If a specific job_id is provided, filter by that job_id
    if (job_id) {
      query += ` AND job_id = ?`;
      queryParams.push(job_id);
    }

    // Execute the query to fetch active job listings
    const [results] = await db.query(query, queryParams);

    // If no job listings are found, return a 404 status
    if ((results as any[]).length === 0) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    // Return the active job listings
    res.status(200).json({ jobListings: results });
  } catch (err) {
    console.error("Error fetching job listings:", err);
    res.status(500).json({ message: "Error fetching job listings", error: err });
  }
};


// 3. Update Job Listing
export const updateJobListing = async (req: Request, res: Response) => {
  const { job_id } = req.params;
  const {
    Company,
    position,
    description,
    requirements,
    application_deadline,
    posting_date,
    job_link, // Added job_link to the request body
  } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { login_id, role } = req.user; // Get user info from middleware

  try {
    // Format dates to 'YYYY-MM-DD'
    const mod_application_deadline = new Date(application_deadline)
      .toISOString()
      .split("T")[0];

    const mod_posting_date = new Date(posting_date).toISOString().split("T")[0];

    // Check if the job listing exists
    const jobQuery = `SELECT * FROM joblistings WHERE job_id = ?`;
    const [jobResults] = await db.query(jobQuery, [job_id]);

    if ((jobResults as any[]).length === 0) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    const jobListing = (jobResults as any)[0];

    // Check if the user is authorized to update (must be the creator or admin)
    if (jobListing.alumni_id !== login_id && role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job listing" });
    }

    const updateQuery = `UPDATE joblistings SET
                         Company = ?, position = ?, description = ?, requirements = ?, application_deadline = ?, posting_date = ?, job_link = ?
                         WHERE job_id = ?`;

    await db.query(updateQuery, [
      Company,
      position,
      description,
      requirements,
      mod_application_deadline,
      mod_posting_date,
      job_link, // Added job_link to the update query
      job_id,
    ]);

    res.status(200).json({ message: "Job listing updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating job listing", error: err });
  }
};

// 4. Delete Job Listing
export const deleteJobListing = async (req: Request, res: Response) => {
  const { job_id } = req.params; // Extract job_id from request parameters

  if (!req.user) {
    console.log("Unauthorized access attempt");
    return res.status(401).json({ message: "Unauthorized" }); // Check if the user is authenticated
  }

  const { login_id, role } = req.user; // Get user info from middleware
  console.log("User ID:", login_id, "Role:", role); // Log user information

  try {
    // Query to check if the job listing exists
    const jobQuery = `SELECT * FROM joblistings WHERE job_id = ?`;
    const [jobResults] = await db.query(jobQuery, [job_id]);

    // Check if the job listing was found
    if ((jobResults as any[]).length === 0) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    const jobListing = (jobResults as any)[0]; // Get the job listing details
    console.log("Job Listing:", jobListing); // Log the job listing details

    // Check if the user is authorized to delete (must be the creator or admin)
    if (jobListing.alumni_id !== login_id && role !== "admin") {
      console.log("Unauthorized delete attempt by user:", login_id);
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job listing" });
    }

    // SQL query to delete the job listing
    const deleteQuery = `DELETE FROM joblistings WHERE job_id = ?`;
    await db.query(deleteQuery, [job_id]); // Execute the delete query

    res.status(200).json({ message: "Job listing deleted successfully" }); // Send success response
  } catch (err) {
    console.error("Error deleting job listing:", err); // Log the error
    res.status(500).json({ message: "Error deleting job listing", error: err }); // Send error response
  }
};

//get all job listings

// 5. Get all job listings with pagination
export const getAllJobs = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1; // Current page number, default is 1
  const pageSize = parseInt(req.query.pageSize as string) || 10; // Number of jobs per page, default is 10
  const offset = (page - 1) * pageSize; // Calculate the offset

  try {
    // Query to get jobs with pagination
    const query = `SELECT * FROM joblistings LIMIT ? OFFSET ?`;

    const [rows] = await db.query(query, [pageSize, offset]);

    // Query to count the total number of jobs for calculating total pages
    const countQuery = `SELECT COUNT(*) AS total FROM joblistings`;
    const [countResult] = await db.query(countQuery);

    const totalJobs = (countResult as any[])[0].total;
    const totalPages = Math.ceil(totalJobs / pageSize);

    res.status(200).json({
      page,
      pageSize,
      totalJobs,
      totalPages,
      jobs: rows,
    });
  } catch (err) {
    console.error("Error fetching job listings:", err);
    res.status(500).json({
      message: "Error fetching job listings",
      error: err,
    });
  }
};

// Get job notifications count
export const getJobNotificationsCount = async (req: Request, res: Response) => {
  try {
    const query = "SELECT COUNT(*) AS jobNotificationsCount FROM joblistings";
    const [results] = await db.query(query);
    const jobNotificationsCount = (results as any[])[0].jobNotificationsCount;

    res.json({ jobNotificationsCount });
  } catch (error) {
    console.error("Error fetching job notifications count:", error);
    res.status(500).json({ error: "Error fetching job notifications count" });
  }
};

// Get recent notifications count
export const getRecentNotificationsCount = async (
  req: Request,
  res: Response
) => {
  try {
    const query = `
      SELECT COUNT(*) AS recentNotificationsCount 
      FROM joblistings
      WHERE posting_date >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
    `;
    const [results] = await db.query(query);
    const recentNotificationsCount = (results as any[])[0]
      .recentNotificationsCount;

    res.json({ recentNotificationsCount });
  } catch (error) {
    console.error("Error fetching recent notifications count:", error);
    res
      .status(500)
      .json({ error: "Error fetching recent notifications count" });
  }
};
