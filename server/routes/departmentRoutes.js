import { Router } from "express";
import { createDepartment, updateDepartment, deleteDepartment, fetchDepartment } from '../controller/departmentController.js';

const router = Router();

router.post('/', createDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);
router.get('/', fetchDepartment);


export default router;