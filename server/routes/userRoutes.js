import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  fetchUserLogin,
  userProfile,
  fetchUser,
  fetchUserList,
} from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", fetchUserLogin);
router.get("/userProfile", auth, userProfile);
router.get("/userList", auth, fetchUserList);
router.get("/status", auth, (req, res) => {
  res.json({ status: "authenticated" });
});
router.get("/checkUser", auth, fetchUser);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ status: 200, message: "Logout Success" });
});

export default router;
