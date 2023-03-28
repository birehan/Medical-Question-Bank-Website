import { Users, validateUser } from "../models/UserModel.js";
import argon2 from "argon2";
import config from "config";

const { CLIENT_URL } = config.get("google");
export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send({ message: `${error.details[0].message}` });
  }
  const { name, email, password, role } = req.body;

  const hashPassword = await argon2.hash(password);
  try {
    let response = await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "user",
    });
    req.session.userId = response.id;

    res.status(201).send({
      name: response.name,
      email: response.email,
      role: response.role,
      id: response.id,
    });
  } catch (error) {
    console.log("error: ", error.errors[0].message);
    res.status(400).json({ message: error.errors[0].message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const { name, email, password, role, newPassword } = req.body;

  if (password) {
    const match = await argon2.verify(user.password, password);
    if (!match)
      return res.status(400).json({ message: "Old password don't match!" });
  }

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(newPassword);
  }
  try {
    const response = await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({
      name: response.name,
      email: response.email,
      role: response.role,
      id: response.id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User do not exist" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
