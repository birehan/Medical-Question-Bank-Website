import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Joi from "joi";

const { DataTypes } = Sequelize;

export const Courses = db.define(
  "course",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export const validateCourse = (course) => {
  const schema = Joi.object({
    file: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    id: Joi.string().required(),
  });
  return schema.validate(course);
};
