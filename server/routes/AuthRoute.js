import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
const router = express.Router();
import passport from "passport";
import config from "config";
const { CLIENT_URL } = config.get("google");
router.get("/me", Me);

router.post("/login", Login);

router.delete("/logout", logOut);

// // Route to set user password after sign up with Google
// // app.get("/auth/set-password", setPassword);

// // Route to handle user password update after sign up with Google
// router.post("/auth/set-password", setPassword);

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