import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Courses } from "./CourseModel.js";

const { DataTypes } = Sequelize;

export const Units = db.define(
  "unit",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    courseId: {
      type: DataTypes.INTEGER,
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

Courses.hasMany(Units);
Units.belongsTo(Courses, { foreignKey: "courseId" });

export const validateUnit = (unit) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    courseId: Joi.string().required(),
  });
  return schema.validate(unit);
};
