import express from "express";
import {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../controllers/Units.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/units/:courseId", getUnits);
router.post("/units", verifyUser, adminOnly, createUnit);

router.get("/unit/:id", getUnitById);
router.put("/unit/:id", verifyUser, adminOnly, updateUnit);
router.delete("/unit/:id", verifyUser, adminOnly, deleteUnit);

export default router;
