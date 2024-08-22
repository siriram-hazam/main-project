import { Router } from "express";
import {
  createCompany,
  updateCompany,
  deleteCompany,
  fetchCompany,
} from "../controller/companyController.js";

import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createCompany);
router.put("/:id", auth, updateCompany);
router.delete("/:id", auth, deleteCompany);
router.get("/", auth, fetchCompany);

export default router;
