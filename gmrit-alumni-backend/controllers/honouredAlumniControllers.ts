import type { Request, Response } from 'express';
import db from '../db/db';
import type { RowDataPacket } from 'mysql2/promise';
import type { ResultSetHeader } from 'mysql2/promise';
import multer from 'multer';
import path from 'path';

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename); // File name will be a timestamp
  }
});

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image files are allowed'));
    }
  }
});

// Create a new honoured alumni record
export const createHonouredAlumni = async (req: Request, res: Response) => {
  const { h_alumni_name, h_alumni_position, h_alumni_desc } = req.body;
  // const h_alumni_img = req.file?.path; // Assuming the image is uploaded correctly
  // const h_alumni_img = req.file ? path.normalize(req.file.path) : null;
  const h_alumni_img = req.file ? path.posix.normalize(req.file.path) : null;

    if (!h_alumni_img && !req.params.id) {
      return res.status(400).json({ message: 'Image file is required' });
    }


  try {
    const query = `
      INSERT INTO honoured_alumni 
        (h_alumni_name, h_alumni_position, h_alumni_desc, h_alumni_img)
      VALUES 
        (?, ?, ?, ?)
    `;
    const [result] = await db.query<ResultSetHeader>(query, [
      h_alumni_name,
      h_alumni_position,
      h_alumni_desc,
      h_alumni_img
    ]);

    res.status(201).json({ message: "Honoured alumni created successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Error creating honoured alumni", error: err });
  }
};

// Get all honoured alumni 
export const getHonouredAllAlumni = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM honoured_alumni`;
    const [result] = await db.query<RowDataPacket[]>(query);

    if (result.length === 0) {
      return res.status(404).json({ message: "No honoured alumni found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving honoured alumni", error: err });
  }
};

// Update an existing honoured alumni record
export const updateHonouredAlumni = async (req: Request, res: Response) => {
  const { h_alumni_id } = req.params;
  const { h_alumni_name, h_alumni_position, h_alumni_desc } = req.body;
  const h_alumni_img = req.file?.path;

  const numericId = parseInt(h_alumni_id, 10);
  if (isNaN(numericId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const selectQuery = `SELECT * FROM honoured_alumni WHERE h_alumni_id = ?`;
    const [selectResult] = await db.query<RowDataPacket[]>(selectQuery, [numericId]);

    if (selectResult.length === 0) {
      return res.status(404).json({ message: "Honoured alumni not found" });
    }

    const query = `
      UPDATE honoured_alumni 
      SET h_alumni_name = ?, h_alumni_position = ?, h_alumni_desc = ?, h_alumni_img = ?
      WHERE h_alumni_id = ?
    `;

    const [result] = await db.query<ResultSetHeader>(query, [
      h_alumni_name,
      h_alumni_position,
      h_alumni_desc,
      h_alumni_img || selectResult[0].h_alumni_img, // Use the old image if no new one is uploaded
      numericId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Honoured alumni not found" });
    }

    res.status(200).json({ message: "Honoured alumni updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating honoured alumni", error: err });
  }
};

// Delete a specific honoured alumni record by ID
export const deleteHonouredAlumni = async (req: Request, res: Response) => {
  const { h_alumni_id } = req.params;

  if (!/^\d+$/.test(h_alumni_id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const numericId = parseInt(h_alumni_id, 10);

  try {
    const selectQuery = `SELECT * FROM honoured_alumni WHERE h_alumni_id = ?`;
    const [selectResult] = await db.query<RowDataPacket[]>(selectQuery, [numericId]);

    if (selectResult.length === 0) {
      return res.status(404).json({ message: "Honoured alumni not found" });
    }

    const deleteQuery = `DELETE FROM honoured_alumni WHERE h_alumni_id = ?`;
    const [deleteResult] = await db.query<ResultSetHeader>(deleteQuery, [numericId]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: "Honoured alumni not found" });
    }

    res.status(200).json({ message: "Honoured alumni deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting honoured alumni", error: err });
  }
};
