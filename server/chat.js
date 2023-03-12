const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");
const Sequelize = require("sequelize");

// Create Sequelize instance
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Deserialize user

// Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: "your_google_client_id",
      clientSecret: "your_google_client_secret",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Create new user if not exists
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          // Redirect to set user password
          return done(null, false, { isNewUser: true, user: user });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Route to set user password after sign up with Google
app.get("/auth/set-password", (req, res) => {
  res.render("set-password", { user: req.user });
});

// Route to handle user password update after sign up with Google
app.post("/auth/set-password", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/auth/set-password");
  }
});

// Route to handle forgot password submission
app.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      // User not found with email
      return res.render("forgot-password", {
        message: "User not found with this email.",
      });
    }

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = Date.now() + 3600000; // 1 hour from now

    // Save reset token and expiration time in user record
    await user.update({
      resetToken: resetToken,
      resetExpires: resetExpires,
    });

    // Send password reset email to user
    const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      from: "your_email_address",
      subject: "Password reset request",
      text: `You are receiving this email because you (or someone else) have requested to reset your password. Click on this link ${resetUrl} to reset your password. If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transporter.sendMail(mailOptions);
    res.render("forgot-password", {
      message: "Password reset email sent. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    res.render("forgot-password", {
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
});

// Route to handle reset password page
app.get("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      where: { resetToken: token, resetExpires: { [Op.gt]: Date.now() } },
    });

    if (!user) {
      // Token is invalid or has expired
      return res.render("reset-password", {
        message: "Password reset token is invalid or has expired.",
      });
    }

    res.render("reset-password", { token: token });
  } catch (error) {
    console.error(error);
    res.render("reset-password", {
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
});

// Route to handle reset password submission
app.post("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const password = req.body.password;

    const user = await User.findOne({
      where: { resetToken: token, resetExpires: { [Op.gt]: Date.now() } },
    });

    if (!user) {
      // Token is invalid or has expired
      return res.render("reset-password", {
        message: "Password reset token is invalid or has expired.",
      });
    }

    // Update user's password and remove reset token and expiration time
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetExpires: null,
    });

    res.render("reset-password", {
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error(error);
  }
});
