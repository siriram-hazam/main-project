import { Router } from "express";
import { createInformation, getInformation } from "../controller/informationController.js"

const router = Router();

router.post('/', createInformation);
router.get('/', getInformation);


export default router;