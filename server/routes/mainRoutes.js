import { Router } from 'express';
import companyRoutes from './companyRoutes.js';
import userRoutes from './userRoutes.js';
import departmentRoutes from './departmentRoutes.js';

const router = Router()

router.use("/api/company", companyRoutes)
router.use("/api/user", userRoutes)
router.use("/api/department", departmentRoutes)

export default router;