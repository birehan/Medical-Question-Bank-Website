import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import {QuestionSets} from "./QuestionSetModel.js";

const { DataTypes } = Sequelize;

export const Questions = db.define(
  "question",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    choices: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    answer: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    explanation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    questionSetId: {
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

QuestionSets.hasMany(Questions);
Questions.belongsTo(QuestionSets, { foreignKey: "questionSetId" });

export const validateQuestion = (question) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    choices: Joi.required(),
    answer: Joi.string().required(),

  });
  return schema.validate(question);
};

