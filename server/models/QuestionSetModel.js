import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { Courses } from "./CourseModel.js";
import Joi from "joi";
import { Units } from "./UnitModel.js";

const { DataTypes } = Sequelize;

export const QuestionSets = db.define(
  "question_set",
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
    duration: {
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
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },

    questionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
Units.hasMany(QuestionSets);
QuestionSets.belongsTo(Units, { foreignKey: "unitId" });

Courses.hasMany(QuestionSets);
QuestionSets.belongsTo(Courses, { foreignKey: "courseId" });

export const validateQuestionSet = (questionSet) => {
  const schema = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.object(),
    questions: Joi.array().items({
      title: Joi.string().required(),
      choices: Joi.array().required(),
      answer: Joi.string().required(),
      explanation: Joi.string(),
      id: Joi.number(),
      questionSetId: Joi.number().optional(),
    }),
    unitId: Joi.number().required(),
    courseId: Joi.number().required(),
  });
  return schema.validate(questionSet);
};
