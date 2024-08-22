import { Router } from "express";

import { getActivitiesOption } from "../controller/activitiesOptionsController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getActivitiesOption);

export default router;
