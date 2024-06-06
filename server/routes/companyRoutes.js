import { Router } from "express";
import {
  createCompany,
  updateCompany,
  deleteCompany,
  fetchCompany,
} from "../controller/companyController.js";

const router = Router();

router.post("/", createCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.get("/", fetchCompany);

export default router;
