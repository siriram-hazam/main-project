import { Router } from 'express'
import { createUser, updateUser, deleteUser, fetchUser, fecthUserAcc, fetchUserLogin } from '../controller/userController.js'

const router = Router();

router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/", fetchUser)
router.get("/login", fetchUserLogin)
router.get("/acc", fecthUserAcc)

export default router;