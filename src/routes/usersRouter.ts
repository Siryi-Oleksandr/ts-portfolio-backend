import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  update,
  getUsers,
  getUserById,
  updateSubscription,
  changePassword,
  forgotPassword,
  resetPassword,
  removeUser,
  googleAuth,
  refresh,
} from "../controllers/userControllers";
import { joiAPI } from "../schemes/JoiAPI";
import { isValidBody, auth, upload, isValidId, passport } from "../middlewares";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

router.get("/", getUsers);
router.post("/register", isValidBody(joiAPI.registerSchema), register);
router.post("/login", isValidBody(joiAPI.loginSchema), login);
router.post("/logout", auth, logout);
router.post("/refresh", isValidBody(joiAPI.refreshSchema), refresh);
router.get("/current", auth, getCurrentUser);
router.get("/:userId", isValidId("userId"), getUserById);
router.patch(
  "/update",
  auth,
  upload.single("avatar"),
  isValidBody(joiAPI.updateUserSchema),
  update
);
router.patch(
  "/updateSubscription",
  auth,
  isValidBody(joiAPI.updateSubscriptionSchema),
  updateSubscription
);
router.patch(
  "/changePassword",
  auth,
  isValidBody(joiAPI.userPasswordSchema),
  changePassword
);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.delete("/:userId", auth, isValidId("userId"), removeUser);

export default router;
