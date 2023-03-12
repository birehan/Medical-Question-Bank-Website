import express from "express";
import {
  getCourseById,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/Courses.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import uploadFile from "../middleware/upload.js";

const router = express.Router();

router.get("/courses", getCourses);
router.get("/course/:id", getCourseById);
router.post(
  "/courses",
  verifyUser,
  adminOnly,
  uploadFile.single("file"),
  createCourse
);
router.put(
  "/course/:id",
  verifyUser,
  adminOnly,
  uploadFile.single("file"),
  updateCourse
);
router.delete("/course/:id", verifyUser, adminOnly, deleteCourse);

export default router;
