import express from "express";
import {
  getAllQuestionSets,
  getCourseQuestionSets,
  createQuestionSets,
  getQuestionSet,
  updateQuestionSet,
  deleteQuestionSet,
} from "../controllers/QuestionSets.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/questions/", getAllQuestionSets);
router.get("/courses/:courseId/questions", getCourseQuestionSets);
router.get("/questions/:questionSetId", verifyUser, getQuestionSet);

router.post("/questions", verifyUser, adminOnly, createQuestionSets);
router.put(
  "/questions/:questionSetId",
  verifyUser,
  adminOnly,
  updateQuestionSet
);

router.delete(
  "/questions/:questionSetId",
  verifyUser,
  adminOnly,
  deleteQuestionSet
);

// router.put("/questions/:questionSetId/like", verifyUser, updateQuestionSet);

export default router;
