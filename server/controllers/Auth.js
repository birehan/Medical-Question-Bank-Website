import { Users } from "../models/UserModel.js";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import crypto from "crypto";

import Sequelize from "sequelize";
import config from "config";
const CLIENT_URL = config.get("CLIENT_URL");

const op = Sequelize.Op;

const transporter = nodemailer.createTransport({
  host: "medquizet.com",
  port: 465, // Replace with the SMTP port for your email provider
  secure: true,
  auth: {
    user: "tsegawmolla@medquizet.com",
    pass: "Medquizet4549abc",
  },
});

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ status: 422, message: "fill all the details" });
    return;
  }

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Wrong email or password!" });

  const match = await argon2.verify(user.password, password);
  if (!match)
    return res.status(400).json({ message: "Wrong email or password!" });
  req.session.userId = user.id;

  res
    .status(200)
    .json({ name: user?.name, email: email, role: user?.role, id: user?.id });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "First log in!" });
  }
  const user = await Users.findOne({
    attributes: ["name", "email", "role", "id"],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User not found." });
  res.status(200).json(user);
};

export const logOut = async (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "can not logout" });
    res.status(200).json({ message: "success" });
  });
};

export const setPassword = async (req, res) => {
  try {
    const hashedPassword = await argon2.hash(password);

    const response = await Users.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );
    // res.redirect("/");au
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};

// Route to handle forgot password submission
export const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) return res.status(404).json({ message: "User not found!" });

    // Generate reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = Date.now() + 3600000; // 1 hour from now

    // Save reset token and expiration time in user record
    await user.update({
      resetToken: resetToken,
      resetExpires: resetExpires,
    });

    const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            background-color: rgb(231, 231, 231) !important;
            color:black !important;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f6f9fa !important;
            padding: 20px;
            border-radius: 20px;
          }
          .header {
            background-color: #007bff;
            color: #fff;
            padding: 20px;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            padding: 20px;
            background-color: #f8f8f8;
          }
          .button {
            display: inline-block;
            background-color: #039198;
            color: #fff !important;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          h1 {
            color: #039198;
          }
          p{
            color:black !important;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="">
            <h1>Medical Question bank</h1>
    
            <h2>Password Reset</h2>
          </div>
          <div class="">
            <p>Hi ${user?.name},</p>
            <p>
              You have requested to reset your password. Please click the button
              below to reset your password:
            </p>
            <p>This request expires in 1 hour.</p>
            <a class="button" href=${resetUrl}>Reset Password</a>
            <p>
              If you did not request this password reset, please ignore this email.
            </p>
            <p>Best regards,</p>
            <p>The Medical Question Bank Team</p>
          </div>
        </div>
      </body>
    </html>
    `;
    const mailOptions = {
      to: email,
      from: "'Medical Question Bank' <tsegawmolla@medquizet.com>",
      subject: "Password reset request",
      auth: {
        user: "tsegawmolla@medquizet.com",
        pass: "Medquizet4549abc",
      },
      html: html,
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: "Message sent succssfully" });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // res.redirect(`http://localhost:3000/email-sent`);
  } catch (error) {
    res.status(404).send({
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
};

// Route to handle forgot password submission

// Route to handle reset password page

export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await Users.findOne({
      where: { resetToken: token, resetExpires: { [op.gt]: Date.now() } },
    });

    if (!user) {
      // Token is invalid or has expired
      return res.status(404).send({
        message: "Password reset token is invalid or has expired.",
      });
    }

    res.redirect(`http://localhost:3000/reset-password/${token}`);
  } catch (error) {
    res.send({
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
};

// Route to handle reset password submission
export const resetPasswordPost = async (req, res) => {
  try {
    const token = req.params.token;
    const password = req.body.password;

    const user = await Users.findOne({
      where: { resetToken: token, resetExpires: { [op.gt]: Date.now() } },
    });

    if (!user) {
      // Token is invalid or has expired
      return res.status(404).send({
        message: "Password reset token is invalid or has expired.",
      });
    }

    // Update user's password and remove reset token and expiration time
    const hashPassword = await argon2.hash(password);

    await user.update({
      password: hashPassword,
      resetToken: null,
      resetExpires: null,
    });

    res.send({
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    res.status(404).send("reset-password error!");
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    if (!username || !email || !message) {
      res.status(422).json({ status: 422, message: "fill all the details" });
      return;
    }
    const mailOptions = {
      to: "tsegawmolla@medquizet.com",
      from: `'Message from ${username}' <${email}>`,
      // subject: "Password reset request",
      auth: {
        user: "tsegawmolla@medquizet.com",
        pass: "Medquizet4549abc",
      },
      text: message,
    };

    const response = await transporter.sendMail(mailOptions);
    res.send({ message: response });
  } catch (error) {
    res.status(404).send({
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
};
