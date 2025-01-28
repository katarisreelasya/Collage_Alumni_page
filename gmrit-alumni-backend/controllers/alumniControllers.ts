import type { Request, Response } from "express";
import db from "../db/db"; // Import the database connection
import { getTotalRows } from "../utils/getTableRows";
import bcrypt from "bcrypt";
import generateAuthToken from "../utils/generateAuthToken";
import { generateRandomPassword } from "../utils/randomGeneratePassword";
import { hashedPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/sendMail";
import { emailTextApproved } from "../utils/emailTexts";
import fs from "fs";
import csvParser from "csv-parser";

// Define the Alumni interface
interface Alumni {
  login_id: string;
  name_of_the_alumni: string;
  gender: string;
  course: string;
  branch: string;
  dob: string;
  passed: number | null;
  address: string;
  state: string;
  country: string;
  zipcode: string;
  phone_no: string;
  mail_id: string;
  dor: string;
  parent_number: string;
  company: string;
  designation: string;
  dept: string;
  PHONE: string;
  MAIL: string;
  current_location: string;
}

export const createAlumniViaCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }

  try {
    const filePath = req.file.path;
    const alumniData: Alumni[] = [];

    // Parse the CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ',' })) // Use comma as separator (assuming CSV is comma-separated)
      .on('data', (row) => {
        if (!row.login_id) {
          console.error(`Missing login_id for row: ${JSON.stringify(row)}`);
          return; // Skip rows without login_id
        }

        alumniData.push({
          login_id: row.login_id,
          name_of_the_alumni: row.name_of_the_alumni || null,
          gender: row.gender || null,
          course: row.course || null,
          branch: row.branch || null,
          dob: row.dob || null,
          passed: row.passed ? parseInt(row.passed, 10) : null,
          address: row.address || null,
          state: row.state || null,
          country: row.country || null,
          zipcode: row.zipcode || null,
          phone_no: row.phone_no || null,
          mail_id: row.mail_id || null,
          dor: row.dor || null,
          parent_number: row.parent_number || null,
          company: row.company || null,
          designation: row.designation || null,
          dept: row.dept || null,
          PHONE: row.PHONE || null,
          MAIL: row.MAIL || null,
          current_location: row.current_location || null,
        });
      })
      .on('end', async () => {
        try {
          if (alumniData.length === 0) {
            return res.status(400).send({ error: 'No valid data to insert.' });
          }

          const values = alumniData.map((row) => [
            row.login_id,
            row.name_of_the_alumni,
            row.gender,
            row.course,
            row.branch,
            row.dob,
            row.passed,
            row.address,
            row.state,
            row.country,
            row.zipcode,
            row.phone_no,
            row.mail_id,
            row.dor,
            row.parent_number,
            row.company,
            row.designation,
            row.dept,
            row.PHONE,
            row.MAIL,
            row.current_location,
          ]);

          // Insert data into the 'alumnidetails' table
          const insertQuery = `
            INSERT INTO alumnidetails (
              login_id, name_of_the_alumni, gender, course, branch, dob, passed, address, 
              state, country, zipcode, phone_no, mail_id, dor, parent_number, company, 
              designation, dept, PHONE, MAIL, current_location
            ) VALUES ?
          `;
          await db.query(insertQuery, [values]);

          // Generate credentials and send emails
          for (const alumni of alumniData) {
            if (!alumni.mail_id) {
              console.warn(`Missing email for alumni with login_id: ${alumni.login_id}`);
              continue;
            }

            const plainPassword = generateRandomPassword();
            const hashedPass = await hashedPassword(plainPassword);

            // Insert credentials into the login table
            const insertLoginQuery = `
              INSERT INTO login (
                alumni_id, user_id, username, password_hash, last_login
              ) VALUES (?, ?, ?, ?, NOW())
            `;
            await db.query(insertLoginQuery, [
              alumni.login_id, // alumni_id
              alumni.login_id, // user_id
              alumni.mail_id, // username
              hashedPass, // password_hash
            ]);

            // Prepare email content
            const mailOptions = {
              to: alumni.mail_id,
              subject: "Welcome to the Alumni Network",
              text: emailTextApproved(
                alumni.name_of_the_alumni,
                alumni.login_id,
                plainPassword,
                "link to the alumni portal"
              ),
            };

            // Send email
            await sendEmail(mailOptions);
          }

          // Remove the uploaded file after processing
          fs.unlinkSync(filePath);

          res.status(200).send({ success: true, message: "CSV data uploaded, inserted successfully, and emails sent!" });

        } catch (error) {
          console.error(error);
          res.status(500).send({ error: `${error} ... Error inserting data or sending emails.Check and re-upload correctly...` });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error processing the file.' });
  }
};

export const createAlumni = async (req: Request, res: Response) => {
  const {
    login_id,
    name_of_the_alumni,
    gender,
    dob,
    branch,
    passed,
    address,
    state,
    country,
    zipcode,
    parent_number,
    mail_id,
    designation,
    company,
    dept,
    dor,
    course,
    phone,
    current_location
  } = req.body;

  try {
    const query = `INSERT INTO alumnidetails (login_id, name_of_the_alumni, gender, dob, branch, passed, address, state, country, zipcode, parent_number, mail_id,designation,company,dept,dor,course,phone_no,current_location) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)`;

    const [result] = await db.query(query, [
      login_id,
      name_of_the_alumni,
      gender,
      dob,
      branch,
      passed,
      address,
      state,
      country,
      zipcode,
      parent_number,
      mail_id,
      designation,
      company,
      dept,
      dor,
      course,
      phone,
      current_location
    ]);

    res.status(201).json({ message: "Alumni created successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error creating alumni", error: err });
  }
};

export const getAlumni = async (req: Request, res: Response) => {
  const { login_id } = req.params;

  try {
    let query = `SELECT * FROM alumnidetails WHERE login_id = ?`;
    let queryParams: any[] = [];

    console.log(login_id, "this is login_id");

    if (login_id) {
      queryParams.push(login_id);
    }

    const [results] = await db.query(query, queryParams);

    if ((results as any[]).length === 0) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.status(200).json({ alumni: results });
  } catch (err) {
    res.status(500).json({ message: "Error fetching alumni", error: err });
  }
};

export const updateAlumni = async (req: Request, res: Response) => {
  console.log(req.user, "this is req.user");
  console.log(req.body, "this is req.user");

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Update authorization logic
  if (req.user.role !== "admin" && req.user.login_id !== req.params.login_id) {
    return res.status(403).json({ message: "Access denied" });
  }

  const {
    name_of_the_alumni,
    gender,
    dob,
    branch,
    passed,
    address,
    state,
    country,
    zipcode,
    parent_number,
    mail_id,
    dor,
    designation,
    company,
    dept,
    phone,
    course,
    current_location
  } = req.body;

  const { login_id } = req.params;

  try {
    const query = `UPDATE alumnidetails SET
                   name_of_the_alumni = ?, gender = ?, dob = ?, branch = ?, passed = ?, address = ?, state = ?, country = ?, zipcode = ?, parent_number = ?, mail_id = ?, dor= ? ,designation = ?, company = ?, dept = ?,phone_no = ?, course = ?, current_location=?
                   WHERE login_id = ?`;

    const [result] = await db.query(query, [
      name_of_the_alumni,
      gender,
      dob,
      branch,
      passed,
      address,
      state,
      country,
      zipcode,
      parent_number,
      mail_id,
      dor,
      designation,
      company,
      dept,
      phone,
      course,
      current_location,
      login_id,
    ]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.status(200).json({ message: "Alumni updated successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error updating alumni", error: err });
  }
};

// 4. Delete an alumni record
export const deleteAlumni = async (req: Request, res: Response) => {
  const { login_id } = req.params;

  try {
    const query = `DELETE FROM alumnidetails WHERE login_id = ?`;
    const [result] = await db.query(query, [login_id]);

    if ((result as any[]).length === 0) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    res.status(200).json({ message: "Alumni deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting alumni", error: err });
  }
};
export const getAllAlumni = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;
  const branch = req.query.branch as string;
  const passedYear = req.query.passed ? parseInt(req.query.passed as string, 10) : undefined;
  const name = req.query.name as string;
  const location = req.query.current_location as string;
  const sortField = (req.query.sortField as string) || ""; // e.g., 'name', 'graduationYear', 'branch'
  const sortOrder = (req.query.sortOrder as string) || "ASC"; // e.g., 'ASC' or 'DESC'

  try {
    let baseQuery = "SELECT * FROM alumnidetails WHERE 1=1";
    let countQuery = "SELECT COUNT(*) as total FROM alumnidetails WHERE 1=1";
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
    // Sorting logic
    if (sortField) {
      baseQuery += ` ORDER BY ${sortField} ${
        sortOrder === "DESC" ? "DESC" : "ASC"
      }`;
    }

    // Pagination
    baseQuery += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    console.log(
      baseQuery,
      "this is base query",
      queryParams,
      "this is queryParams"
    );

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
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { login_id, password } = req.body;
  try {
    const query = `SELECT * FROM login WHERE alumni_id = ?`;

    const [results] = await db.query(query, [login_id]);
    if (!results) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      (results as any[])[0].password_hash
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate the auth token using the user's login ID
    const token = generateAuthToken((results as any[])[0].alumni_id);
    console.log(token, "this is token", (results as any[])[0].alumni_id);

    // Set the token in the cookie
    res.cookie("authToken", token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};

export const createAlumniRegistrationRequest = async (req: Request, res: Response) => {
  const {
    name_of_the_alumni,
    gender,
    dob,
    course,
    branch,
    passed,
    address,
    state,
    country,
    zipcode,
    phone_no,
    mail_id,
    parent_number,
    designation,
    company,
    dept,
    dor,
    jntu_id,
    organization,
    department,
    work_phone,
    work_email,
    experience_years,
    current_location,
    title,
    description,
    achievement_date,
    password
  } = req.body;

  try {
    // Format dates
    const formattedDob = dob ? new Date(dob).toISOString().slice(0, 10) : null;
    const formattedAchievementDate = achievement_date ? new Date(achievement_date).toISOString().slice(0, 10) : null;
    // const formattedDor = dor ? new Date(dor).toISOString().slice(0, 10) : null;

    const query = `
      INSERT INTO alumni_registration_requests 
        (name_of_the_alumni, gender, dob, course, branch, passed, address, state, country, zipcode, 
        phone_no, mail_id, parent_number, designation, company, dept, dor, jntu_id, 
        organization, department, work_phone, work_email, experience_years, current_location, title, description, achievement_date, password)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name_of_the_alumni,
      gender,
      formattedDob,
      course,
      branch,
      passed,
      address,
      state,
      country,
      zipcode,
      phone_no,
      mail_id,
      parent_number,
      designation,
      company,
      dept,
      dor,
      jntu_id,
      organization,
      department,
      work_phone,
      work_email,
      experience_years,
      current_location,
      title,
      description,
      formattedAchievementDate,
      password
    ];

    // Debugging: Log query and values to make sure they match
    console.log('SQL Query:', query);
    console.log('Values:', values);

    const [result] = await db.query(query, values);

    res.status(201).json({ message: "Registration request created successfully", result });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("SQL error:", error.message); // Log error message
    res.status(500).json({ message: "Error creating registration request", error: error.message });
  }
};




export const getTotalAlumniCount = async (req: Request, res: Response) => {
  try {
    const query = "SELECT COUNT(*) AS totalAlumniCount FROM alumnidetails";
    const [results] = await db.query(query);
    const totalAlumniCount = (results as any[])[0].totalAlumniCount;

    res.json({ totalAlumniCount });
  } catch (error) {
    console.error("Error fetching total alumni count:", error);
    res.status(500).json({ error: "Error fetching total alumni count" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.login_id; // Assuming the token contains userId

    // Fetch the user's information from the database using the userId
    const [user] = await db.query(
      "SELECT * FROM alumnidetails WHERE login_id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user information (without password)
    // Exclude sensitive information like password
    res.json({
      message: "User data retrieved successfully",
      user: (user as any[])[0],
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAlumniRequestsById = async (req: Request, res: Response) => {
  const { request_id } = req.params;

  const [result] = await db.query(
    "SELECT * FROM alumni_registration_requests WHERE request_id = ?",
    [request_id]
  );

  if (!result) {
    return res.status(404).json({ message: "request not found" });
  }

  res.json({
    message: "User data retrieved successfully",
    user: (result as any[])[0],
  });
};

export const getAlumniByBranch = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT branch, COUNT(*) as count
      FROM alumnidetails
      GROUP BY branch
    `;
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve alumni data", details: error });
  }
};

// method to get no.of logins in last 12 months

export const getMonthlyLogins = async (req: Request, res: Response) => {
  try {
    // SQL query to aggregate logins by month for the last 12 months (current month inclusive)
    const query = `
      SELECT 
        DATE_FORMAT(last_login, '%Y-%m') AS month,
        COUNT(*) AS login_count
      FROM login
      WHERE last_login >= DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 11 MONTH), '%Y-%m-01')
      GROUP BY DATE_FORMAT(last_login, '%Y-%m')
      ORDER BY DATE_FORMAT(last_login, '%Y-%m');
    `;
    const [results] = await db.execute(query);

    // console.log("Raw SQL Results:", results);

    // Get the current date and generate the last 12 months (current month inclusive)
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i)); // Adjusting month properly
      return date.toISOString().slice(0, 7); // Format as YYYY-MM
    });

    // console.log("Generated Months:", last12Months);

    // Align database results with the last 12 months
    const formattedResults = last12Months.map((month) => {
      const record = (results as any[]).find((r) => r.month === month);
      return {
        month,
        login_count: record ? record.login_count : 0,
      };
    });

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error Details:", error);
    res.status(500).json({ error: "Failed to retrieve login data", details: error });
  }
};











