import { Router } from "express";
import {
  createInformation,
  getInformation,
  deleteInformation,
  updateInformationApproval,
} from "../controller/informationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createInformation);
router.get("/", auth, getInformation);
router.delete("/:id", auth, deleteInformation);
router.put("/:id", auth, updateInformationApproval);

export default router;
