import express from "express";
import {
  alumniController,
  jobController,
  adminControllers,
  threadControllers,
  replyThreadControllers,
  getAlumniRequestsControllers,
  alumniacheivementControllers,
  employeehistoryControllers,
  eventsControllers,
  meetControllers,
  webinarControllers,
  AddClgEvent,
  clgPostsControllers,
  honouredAlumniControllers,
  updatePasswordControllers,
  getAlumniPlacementDetails,
  birthdayScheduler,
  todaysBirthdaysControllers,
  AddFriendControllers
} from "../controllers";

// import { birthdayScheduler } from "../controllers/birthdayScheduler";
import { isAdmin, validateAuth } from "../middleware/authMiddleware";
import db from "../db/db";
import { hashedPassword } from "../utils/hashPassword";
import multer from "multer"; // Fixed import
import csvParser from "csv-parser"; // Fixed import
import fs from "fs";
import path from "path";

const router = express.Router();

// Set up multer to handle file uploads
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads'); // Save in the 'uploads' directory
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  },
});

const upload = multer({ storage });

// Send mails to all 

// /api/send-emails-to-all


// Route to handle CSV upload and processing
router.post("/alumni/add/csv", isAdmin, upload.single("file"), alumniController.createAlumniViaCSV);

// ================= Login password reset =====================
router.put('/reset-password',validateAuth,updatePasswordControllers.resetPassword);

// =========================== todays birthdays route =======================

router.get('/todays_birthdays',todaysBirthdaysControllers.getTodaysBirthdays);

// =========================== Route to add and retrieve friends of alumnus =======================

router.post('/add_friends',validateAuth,AddFriendControllers.addFriend);
router.get('/get_friends/:login_id',validateAuth,AddFriendControllers.getFriends);
router.delete('/delete_friends/:friend_id',validateAuth,AddFriendControllers.deleteFriend);

// =================Alumni Routes================

router.post("/alumni/add/new", isAdmin, alumniController.createAlumni);
router.get("/alumni/get/:login_id", validateAuth, alumniController.getAlumni);
router.get("/alumni/all", validateAuth, alumniController.getAllAlumni);
router.get("/alumni/all/placed", validateAuth, getAlumniPlacementDetails.getAlumniPlacementDetails);
router.get("/alumni/me", validateAuth, alumniController.getMe);
router.put("/alumni/update/:login_id", validateAuth, alumniController.updateAlumni);
router.delete("/alumni/delete/:login_id", isAdmin, alumniController.deleteAlumni);
router.post("/alumni/login", alumniController.loginUser);
router.post("/alumni/request/register", alumniController.createAlumniRegistrationRequest);
router.get("/alumni/count", alumniController.getTotalAlumniCount);

// ============= Statistics Routes =================
router.get("/alumni/branches", isAdmin, alumniController.getAlumniByBranch);
router.get("/alumni/monthlyLogins", isAdmin, alumniController.getMonthlyLogins);


// ============= Alumni Requests Handling =================
router.get("/alumni/requests/count", isAdmin, getAlumniRequestsControllers.getAlumniRequestsCount);
router.get("/requests", isAdmin, adminControllers.getAllAlumniRegisterRequests);
router.get("/requests/:requestId", isAdmin, adminControllers.getRequestDetails);
router.post("/requests/approve", isAdmin, adminControllers.approveOrRejectRequest);
router.post("/requests/reject", isAdmin, adminControllers.approveOrRejectRequest);

// ===============Honoured Alumni Routes================

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Create honoured alumni (POST request)
router.post("/honoured/alumni/add", isAdmin, upload.single("h_alumni_img"), honouredAlumniControllers.createHonouredAlumni);

// Get all honoured alumni (GET request)
router.get("/honoured/alumni/all", honouredAlumniControllers.getHonouredAllAlumni);

// Update honoured alumni (PUT request)
router.put("/honoured/alumni/update/:h_alumni_id", isAdmin, upload.single("h_alumni_img"), honouredAlumniControllers.updateHonouredAlumni);

// Delete honoured alumni (DELETE request)
router.delete("/honoured/alumni/delete/:h_alumni_id", isAdmin, honouredAlumniControllers.deleteHonouredAlumni);

// ===============Job Routes================

router.post("/jobs/add", validateAuth, jobController.createJobListing);
router.get("/jobs/:job_id", validateAuth, jobController.getJobListings);
router.put("/jobs/update/:job_id", validateAuth, jobController.updateJobListing);
router.delete("/jobs/delete/:job_id", validateAuth, jobController.deleteJobListing);
router.get("/jobs/get/all", validateAuth, jobController.getAllJobs);

router.get("/jobNotificationsCount", jobController.getJobNotificationsCount);
router.get("/recentNotificationsCount", jobController.getRecentNotificationsCount);

// ===============Events Routes================
router.post("/add/events", isAdmin, eventsControllers.addEvent);
router.get("/get/events/completed", eventsControllers.getCompletedEvents);
router.get("/get/events/ongoing", eventsControllers.getOngoingEvents);
router.put("/update/events/:event_id", isAdmin, eventsControllers.updateEvent);
router.delete("/delete/events/:event_id", isAdmin, eventsControllers.deleteEvent);
router.get("/get/events/completed/count", isAdmin, eventsControllers.getCompletedEventsCount);
router.get("/get/events/ongoing/count", isAdmin, eventsControllers.getOngoingEventsCount);

// ================Meet Routes================

router.post("/meet/add", isAdmin, meetControllers.addMeet);
router.delete("/meet/delete/:meet_id", isAdmin, meetControllers.deleteMeet);
router.put("/meet/update/:meet_id", isAdmin, meetControllers.editMeet);
router.get("/meet/get/all", meetControllers.getAllMeets);

// ===============Admin Routes================

router.post("/admin/login", adminControllers.adminLogin);
router.post("/admin/alumni/add", isAdmin, adminControllers.approveOrRejectRequest);
router.post("/admin/register", async (req, res) => {
  try {
    let hashedPass = await hashedPassword(req.body.password);
    await db.query("INSERT INTO admin (username, password_hash, email, admin_id) VALUES (?,?,?,?)", [
      req.body.username,
      hashedPass,
      req.body.email,
      req.body.admin_id,
    ]);
    res.send("Admin Register");
  } catch (error) {
    res.send(error);
  }
});

router.get("/alumni/request/:request_id", isAdmin, alumniController.getAlumniRequestsById);

// ======================Routes for Threads and Replies================

router.post("/threads", validateAuth, threadControllers.createThread);
router.get("/threads", validateAuth, threadControllers.getAllThreads);
router.get("/threads/:thread_id", validateAuth, threadControllers.getThreadById);
router.post("/threads/:thread_id/replies", validateAuth, replyThreadControllers.createReply);
router.get("/threads/:thread_id/replies", validateAuth, replyThreadControllers.getRepliesByThread);

// ======================Routes for Achievement================

router.post("/alumni/acheivements/add", validateAuth, alumniacheivementControllers.addAchievement);
router.put("/achievements/update/:achievement_id", validateAuth, alumniacheivementControllers.updateAchievement);
router.delete("/achievements/delete/:achievement_id", validateAuth, alumniacheivementControllers.deleteAchievement);
router.get("/achievements/:login_id", alumniacheivementControllers.getAchievements);

// ==================Routes for Employee History================

router.get("/alumni/employee/history/:alumni_id", employeehistoryControllers.getJobDetails);
router.post("/alumni/employee/history/:alumni_id", validateAuth, employeehistoryControllers.addEmploymentHistory);
router.delete("/alumni/employee/history/delete/:idEmployment_id", validateAuth, employeehistoryControllers.deleteEmploymentHistory);
router.put("/alumni/employee/history/update/:idEmployment_id", validateAuth, employeehistoryControllers.updateEmploymentHistory);

router.post("/logout", (req, res) => {
  res.clearCookie("authToken", { path: "/" });
  res.status(200).send({ message: "Logged out successfully, cookie cleared." });
});

// =================== Webinar Routes ===================

router.post("/webinar/add", isAdmin, webinarControllers.addWebinar);
router.get("/webinar/get/all", validateAuth, webinarControllers.getWebinars);
router.put("/webinar/update/:web_id", isAdmin, webinarControllers.updateWebinar);
router.delete("/webinar/delete/:web_id", isAdmin, webinarControllers.deleteWebinar);

// Add event
router.post("/events/add", isAdmin, AddClgEvent.addClgEvent);
router.get("/events", clgPostsControllers.viewClgEvents);
router.get("/events/:post_id", clgPostsControllers.viewSingleClgEvent);
router.put("/events/:post_id", isAdmin, clgPostsControllers.editClgEvent);
router.delete("/events/:post_id", isAdmin, clgPostsControllers.deleteClgEvent);
router.get("/events/:image", clgPostsControllers.fetchImage);

export default router;
