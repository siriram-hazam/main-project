import { Router } from "express";
import companyRoutes from "./companyRoutes.js";
import userRoutes from "./userRoutes.js";
import departmentRoutes from "./departmentRoutes.js";
import informationRoutes from "./informationRoutes.js";
import activitiesOptionsRoutes from "./activitiesOptionsRoutes.js";

const router = Router();

router.use("/api/company", companyRoutes);
router.use("/api/user", userRoutes);
router.use("/api/department", departmentRoutes);
router.use("/api/information", informationRoutes);
router.use("/api/activitiesOptions", activitiesOptionsRoutes);

export default router;
