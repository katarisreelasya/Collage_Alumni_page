import schedule from "node-schedule";
import dayjs from "dayjs";
import db from "../db/db"; // Your database connection
import { sendEmail } from "../utils/sendMail"; // Your email function

// Function to query the database for today's birthdays and send emails
async function sendBirthdayWishes() {
  try {
    // Get today's date in the format "MM-DD"
    const today = dayjs().format("MM-DD");

    // Query to find members whose birthday matches today
    const [rows] = await db.execute(
      `SELECT name_of_the_alumni, mail_id, dob 
       FROM alumni 
       WHERE DATE_FORMAT(dob, '%m-%d') = ?`,
      [today]
    );

    const alumni: Array<{ name_of_the_alumni: string; mail_id: string }> = rows as any;

    // Iterate through the results and send birthday emails
    for (const { name_of_the_alumni, mail_id } of alumni) {
      if (mail_id) {
        const subject = "Happy Birthday 🎉";
        const text = `Dear ${name_of_the_alumni},\n\nWishing you a very Happy Birthday! 🎂✨\n\nBest regards,\nAlumni Team`;

        await sendEmail({ to: mail_id, subject, text });
        console.log(`Sent birthday email to ${name_of_the_alumni} (${mail_id})`);
      }
    }

    if (alumni.length === 0) {
      console.log("No birthdays today.");
    }
  } catch (error) {
    console.error("Error sending birthday wishes:", error);
  }
}

// Schedule the job to run daily at 8 AM
schedule.scheduleJob("0 10 * * *", () => {
  console.log("Running the birthday wish scheduler at 10:00 AM...");
  sendBirthdayWishes();
});

