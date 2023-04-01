import express from "express";
import {
  Login,
  logOut,
  Me,
  forgetPassword,
  resetPassword,
  resetPasswordPost,
  sendMessage,
} from "../controllers/Auth.js";
const router = express.Router();
import passport from "passport";
import config from "config";
const { CLIENT_URL } = config.get("google");
router.get("/me", Me);

router.post("/login", Login);
router.post("/forgetpassword", forgetPassword);
router.get("/reset-password/:token", resetPassword);
router.post("/reset-password/:token", resetPasswordPost);
router.post("/sendmessage", sendMessage);

router.delete("/logout", logOut);


router.get(
  "/auth/google",
  passport.authenticate("google", ["profile", "email"])
);
router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/home`,
    failureRedirect: "/login/failed",
  })
);

export default router;
