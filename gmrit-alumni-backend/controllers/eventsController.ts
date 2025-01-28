import type { Request, Response } from "express";
import db from "../db/db"; // Import the database connection

// Add a new event to the database
export const addEvent = async (req: Request, res: Response) => {
  const {
    event_title,
    event_desc,
    event_start_date,
    event_end_date,
    event_start_day,
    event_duration
  } = req.body;

  const posted_time = new Date(); // Automatically set posted time to current time

  try {
    const sqlInsert = `
      INSERT INTO events (event_title, event_desc, event_start_date, event_end_date, posted_time, event_start_day, event_duration)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(sqlInsert, [
      event_title,
      event_desc,
      event_start_date,
      event_end_date,
      posted_time,
      event_start_day,
      event_duration
    ]);

    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Error adding event" });
  }
};

// Get completed events where event_start_date - posted_time <= 0
export const getCompletedEvents = async (req: Request, res: Response) => {
  try {
    const sqlCompletedEvents = `
      SELECT * FROM events
      WHERE DATEDIFF(event_start_date, posted_time) <= 0
    `;

    const [completedEvents] = await db.query(sqlCompletedEvents);
    res.status(200).json(completedEvents);
  } catch (error) {
    console.error("Error fetching completed events:", error);
    res.status(500).json({ message: "Error fetching completed events" });
  }
};

// Get ongoing events where event_start_date - posted_time > 0
export const getOngoingEvents = async (req: Request, res: Response) => {
  try {
    const sqlOngoingEvents = `
      SELECT * FROM events
      WHERE DATEDIFF(event_start_date, posted_time) > 0
    `;

    const [ongoingEvents] = await db.query(sqlOngoingEvents);
    res.status(200).json(ongoingEvents);
  } catch (error) {
    console.error("Error fetching ongoing events:", error);
    res.status(500).json({ message: "Error fetching ongoing events" });
  }
};

// Method to update an event
export const updateEvent = async (req: Request, res: Response) => {
    const eventId = req.params.event_id; 
    const {
      event_title,
      event_desc,
      event_start_date,
      event_end_date,
      event_start_day,
      event_duration
    } = req.body; // Destructure data from the request body
  
    const query = `
      UPDATE events
      SET
        event_title = ?,
        event_desc = ?,
        event_start_date = ?,
        event_end_date = ?,
        event_start_day = ?,
        event_duration = ?
      WHERE event_id = ?
    `;
  
    const values = [
      event_title,
      event_desc,
      event_start_date,
      event_end_date,
      event_start_day,
      event_duration,
      eventId
    ];
  
    try {
      const [result] = await db.query(query, values); // Execute the query with parameters
      const affectedRows = (result as { affectedRows: number }).affectedRows; // Cast result to access affectedRows
  
      if (affectedRows > 0) {
        return res.status(200).json({ message: 'Event updated successfully!' });
      } else {
        return res.status(404).json({ message: 'Event not found!' });
      }
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ message: 'Failed to update event', error });
    }
  };
  
  // Method to delete an event
  export const deleteEvent = async (req: Request, res: Response) => {
    const eventId = req.params.event_id; // Get the event ID from the URL parameters
  
    const query = `DELETE FROM events WHERE event_id = ?`; // SQL query to delete the event
  
    try {
      const [result] = await db.query(query, [eventId]); // Execute the delete query
      const affectedRows = (result as { affectedRows: number }).affectedRows; // Cast result to access affectedRows
  
      if (affectedRows > 0) {
        return res.status(200).json({ message: 'Event deleted successfully!' });
      } else {
        return res.status(404).json({ message: 'Event not found!' });
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'Failed to delete event', error });
    }
  };

  // Get ongoing events where event_start_date - posted_time > 0
export const getOngoingEventsCount = async (req: Request, res: Response) => {
    try {
      const sqlOngoingEvents = `
        SELECT count(*) as count FROM events
        WHERE DATEDIFF(event_start_date, posted_time) > 0
      `;
      const [ongoingEvents] = await db.query(sqlOngoingEvents);
      res.status(200).json(ongoingEvents);
    } catch (error) {
      console.error("Error fetching ongoing events:", error);
      res.status(500).json({ message: "Error fetching ongoing events" });
    }
  };
  
  // Get completed events where event_start_date - posted_time <= 0
  export const getCompletedEventsCount = async (req: Request, res: Response) => {
    try {
      const sqlCompletedEvents = `
        SELECT count(*) as count FROM events
        WHERE DATEDIFF(event_start_date, posted_time) <= 0
      `;
      const [completedEvents] = await db.query(sqlCompletedEvents);
      res.status(200).json(completedEvents);
    } catch (error) {
      console.error("Error fetching completed events:", error);
      res.status(500).json({ message: "Error fetching completed events" });
    }
  };