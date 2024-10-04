import { Router } from "express";
import {
  createInformation,
  getInformation,
  updateInformation,
  deleteInformation,
  updateInformationApproval,
  excelProcess,
} from "../controller/informationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createInformation);
router.get("/", auth, getInformation);
router.put("/updateInfo/:id", auth, updateInformation);
router.delete("/:id", auth, deleteInformation);
router.put("/:id", auth, updateInformationApproval);
router.post("/downloadexcel", auth, excelProcess);

export default router;
