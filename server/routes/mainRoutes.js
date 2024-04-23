import { Router } from 'express';
import companyRoutes from './companyRoutes.js'
import userRoutes from './userRoutes.js';

const router = Router()

router.use("/api/company", companyRoutes)
router.use("/api/user", userRoutes)

export default router;