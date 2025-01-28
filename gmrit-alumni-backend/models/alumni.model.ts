import db from "../db/db";

interface AlumniDetails {
  alumni_id: number;
  login_id: string;
  name_of_the_alumni: string;
  gender: string;
  dob: string;
  branch: string;
  passed: string;
  address: string;
  state: string;
  country: string;
  zipcode: string;
  parent_number: string;
  mail_id: string;
  phone_no: string;
  company: string;
  designation: string;
  course: string;
  dor: string;
  dept: string;
  s_no: number; // Assuming s_no is a number
}

interface Achievement {
  achievement_id: number;
  alumni_id: string; // Assuming LOGIN ID relates to alumni
  description: string;
  achievement_date: string;
  title: string;
}

export const AlumniDetailsModel = {
  // Example of creating a new alumni details entry
  create: async (alumni: AlumniDetails): Promise<void> => {
    const query = `INSERT INTO alumnidetails (alumni_id, login_id, name_of_the_alumni, gender, dob, branch, passed, address, state, country, zipcode, parent_number, mail_id, phone_no, company, designation, course, dor, dept, s_no)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(query, [
      alumni.alumni_id,
      alumni.login_id,
      alumni.name_of_the_alumni,
      alumni.gender,
      alumni.dob,
      alumni.branch,
      alumni.passed,
      alumni.address,
      alumni.state,
      alumni.country,
      alumni.zipcode,
      alumni.parent_number,
      alumni.mail_id,
      alumni.phone_no,
      alumni.company,
      alumni.designation,
      alumni.course,
      alumni.dor,
      alumni.dept,
      alumni.s_no,
    ]);
  },
  findByLoginId: async (
    alumni_login_id: string
  ): Promise<AlumniDetails | null> => {
    const query = "SELECT * FROM alumnidetails WHERE login_id = ?";

    const [results] = await db.query(query, [alumni_login_id]);
    if ((results as any[]).length === 0) {
      return null;
    }

    return (results as any)[0];
  },
};
