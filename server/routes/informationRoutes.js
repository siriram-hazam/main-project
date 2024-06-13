import { Router } from "express";
import {
  createInformation,
  getInformation,
} from "../controller/informationController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createInformation);
router.get("/", auth, getInformation);

export default router;
