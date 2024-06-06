import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  fetchUser,
  fecthUserAcc,
  fetchUserLogin,
  userProfile,
} from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", fetchUser);
router.post("/login", fetchUserLogin);
router.get("/acc", fecthUserAcc);
router.get("/userProfile", auth, userProfile);

export default router;
