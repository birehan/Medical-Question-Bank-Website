import { Users } from "../models/UserModel.js";
import argon2 from "argon2";
import passport from "../passport.js";

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

  res.status(200).json({ name: user?.name, email: email, role: user?.role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "First log in!" });
  }
  const user = await Users.findOne({
    attributes: ["name", "email", "role"],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User not found." });
  res.status(200).json(user);
};

export const logOut = async (req, res) => {
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
    // res.redirect("/auth/set-password");
  }
  // res.render("set-password", { user: req.user });
};
