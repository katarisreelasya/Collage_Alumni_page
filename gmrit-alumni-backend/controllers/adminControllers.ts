import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db";
import type { Request, Response } from "express";
import { generateRandomPassword } from "../utils/randomGeneratePassword";
import { hashedPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/sendMail";
import { emailTextApproved } from "../utils/emailTexts";
import type { TokenPayload } from "../middleware/authMiddleware";


export const approveOrRejectRequest = async (req: Request, res: Response) => {
  const { request_id, action } = req.body;

  try {
    const [request] = await db.query(
      "SELECT * FROM alumni_registration_requests WHERE request_id = ?",
      [request_id]
    );

    if ((request as any[]).length === 0) {
      return res
        .status(404)
        .json({ message: "Registration request not found" });
    }

    const alumni_registration_request = (request as any[])[0];
    const plainPassword = alumni_registration_request.password;
    const hashedPass = await hashedPassword(plainPassword);

    // Format dob to 'YYYY-MM-DD'
    const formattedDob = alumni_registration_request.dob
      ? new Date(alumni_registration_request.dob).toISOString().slice(0, 10)
      : null;

    if (action === "approve") {
      // Insert into alumnidetails
      const insertAlumniQuery = `
        INSERT INTO alumnidetails (
          login_id, name_of_the_alumni, gender, dob, course, branch, passed, 
          address, state, country, zipcode, phone_no, mail_id, parent_number, 
          designation, company, dept, dor, current_location
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await db.query(insertAlumniQuery, [
        alumni_registration_request.jntu_id, // login_id
        alumni_registration_request.name_of_the_alumni, // name_of_the_alumni
        alumni_registration_request.gender, // gender
        formattedDob, // dob, formatted as 'YYYY-MM-DD'
        alumni_registration_request.course, // course
        alumni_registration_request.branch, // branch
        alumni_registration_request.passed, // passed
        alumni_registration_request.address, // address
        alumni_registration_request.state, // state
        alumni_registration_request.country, // country
        alumni_registration_request.zipcode, // zipcode
        alumni_registration_request.phone_no, // phone_no
        alumni_registration_request.mail_id, // mail_id
        alumni_registration_request.parent_number, // parent_number
        alumni_registration_request.designation, // designation
        alumni_registration_request.company, // company
        alumni_registration_request.dept, // dept
        alumni_registration_request.dor, // dor
        alumni_registration_request.current_location, // current_location
      ]);

      // Insert into employment_history
      const insertEmploymentHistoryQuery = `
        INSERT INTO employment_history (
          alumni_id, organization, designation, department, experience_years, 
          work_phone, work_email, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
      `;

      await db.query(insertEmploymentHistoryQuery, [
        alumni_registration_request.jntu_id, // alumni_id
        alumni_registration_request.organization, // organization
        alumni_registration_request.designation, // designation
        alumni_registration_request.department, // department
        alumni_registration_request.experience_years, // experience_years
        alumni_registration_request.work_phone, // work_phone
        alumni_registration_request.work_email, // work_email
      ]);

      // Insert into achievements
      const insertAchievementsQuery = `
        INSERT INTO achievements (
          title, description, achievement_date, alumni_id, created_at
        ) VALUES (?, ?, ?, ?, NOW())
      `;

      await db.query(insertAchievementsQuery, [
        alumni_registration_request.title, // title
        alumni_registration_request.description, // description
        alumni_registration_request.achievement_date, // achievement_date
        alumni_registration_request.jntu_id, // alumni_id
      ]);

      // Insert into login table
      const insertLoginQuery = `
        INSERT INTO login (
          alumni_id, user_id, username, password_hash, last_login
        ) VALUES (?, ?, ?, ?, NOW())
      `;

      await db.query(insertLoginQuery, [
        alumni_registration_request.jntu_id, // alumni_id
        alumni_registration_request.jntu_id, // user_id
        alumni_registration_request.mail_id, // username
        hashedPass, // password_hash
      ]);

      // Delete the registration request
      await db.query(
        "DELETE FROM alumni_registration_requests WHERE request_id = ?",
        [request_id]
      );

      const mailOptions = {
        to: alumni_registration_request.mail_id,
        subject: "Alumni Registration Approved",
        text: emailTextApproved(
          alumni_registration_request.name_of_the_alumni,
          alumni_registration_request.jntu_id,
          plainPassword,
          "link for the updation"
        ),
      };

      console.log(plainPassword, mailOptions, "this is password");

      // Uncomment to send email
      await sendEmail(mailOptions);

      res
        .status(200)
        .json({ message: "Request approved and added to alumni details" });
    } else if (action === "reject") {
      // Send rejection email
      const mailOptions = {
        to: alumni_registration_request.mail_id,
        subject: "Alumni Registration Rejected",
        text: `Dear ${alumni_registration_request.name_of_the_alumni},\n\nWe regret to inform you that your alumni registration has been rejected.\n\nBest regards,\nAdmin Team`,
      };

      // Uncomment to send email
      await sendEmail(mailOptions);

      // Delete the registration request
      await db.query(
        "DELETE FROM alumni_registration_requests WHERE request_id = ?",
        [request_id]
      );

      res.status(302).json({ message: "Request rejected and email sent" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error processing request", error: err });
  }
};


export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM admin WHERE username = ?";
    const [results] = await db.query(query, [username]);

    if ((results as any[]).length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = (results as any[])[0];
    const validPassword = await bcrypt.compare(password, admin.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload: TokenPayload = {
      userId: admin.admin_id,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "gmrit", {
      expiresIn: "1d",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};

export const getAllAlumniRegisterRequests = async (
  req: Request,
  res: Response
) => {
  let page = req.query.page ? parseInt(req.query.page as string) : 1;
  let limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  let offset = (page - 1) * limit;

  try {
    let query = "SELECT * FROM alumni_registration_requests LIMIT ? OFFSET ?";

    const queryParams = [limit, offset];
    // console.log(query, "this is query");

    const [results] = await db.query(query, queryParams);
    res.status(200).json({ requests: results });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err });
  }
};

export const getRequestDetails = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  try {
    // Perform the query and destructure the results
    const [results] = await db.query(
      "SELECT * FROM alumni_registration_requests WHERE request_id = ?",
      [requestId]
    );

    // Type assertion: We expect results to be an array of requests
    const request = results as any[]; // You can create a proper interface/type if desired

    if (request.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ request: request[0] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching request details", error: err });
  }
};