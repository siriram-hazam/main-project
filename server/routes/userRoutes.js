import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  fecthUserAcc,
  fetchUserLogin,
  userProfile,
} from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", fetchUserLogin);
router.get("/acc", fecthUserAcc);
router.get("/userProfile", auth, userProfile);

export default router;
