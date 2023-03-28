import express from "express";
import {
  getAllQuestionSets,
  getCourseQuestionSets,
  createQuestionSets,
  getQuestionSet,
  updateLike,
  deleteQuestionSet,
  updateQuestionSet,
  extractQuestions,
} from "../controllers/QuestionSets.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

import multer from "multer";
// configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
router.get("/questions/", getAllQuestionSets);
router.get("/courses/:courseId/questions", getCourseQuestionSets);
router.get("/questions/:questionSetId", verifyUser, getQuestionSet);

router.post("/extractquestion", upload.single("file"), extractQuestions);

router.post("/questions", verifyUser, adminOnly, createQuestionSets);
router.put(
  "/questions/:questionSetId",
  verifyUser,
  adminOnly,
  updateQuestionSet
);
router.put("/updateLike", verifyUser, updateLike);

router.delete(
  "/questions/:questionSetId",
  verifyUser,
  adminOnly,
  deleteQuestionSet
);

// router.put("/questions/:questionSetId/like", verifyUser, updateQuestionSet);

export default router;
