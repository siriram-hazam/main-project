import { Router } from "express";
import {
  createUser,
  updateEditUser,
  deleteUser,
  fetchUserLogin,
  userProfile,
  fetchUser,
  fetchUserList,
  updateUserPassword,
} from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", auth, updateEditUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", fetchUserLogin);
router.get("/userProfile", auth, userProfile);
router.get("/userList", auth, fetchUserList);
router.get("/status", auth, (req, res) => {
  res.json({ status: "authenticated", user: req.user });
});
router.get("/checkUser", auth, fetchUser);
router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  });
  res.json({ status: 200, message: "Logout Success" });
});
router.put("/updatePassword/:id", auth, updateUserPassword);

export default router;
