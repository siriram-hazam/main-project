import { Router } from "express";
import { createInformation } from "../controller/informationController.js"

const router = Router();

router.post('/', createInformation);

export default router;