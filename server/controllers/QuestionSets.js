import {
  QuestionSets,
  validateQuestionSet,
} from "../models/QuestionSetModel.js";
import { Questions } from "../models/QuestionModel.js";
// get question sets
export const getAllQuestionSets = async (req, res) => {
  try {
    const response = await QuestionSets.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionSet = async (req, res) => {
  try {
    const response = await Questions.findAll({
      where: {
        questionSetId: req.params.questionSetId,
      },
      attributes: [
        "id",
        "title",
        "choices",
        "answer",
        "explanation",
        "questionSetId",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseQuestionSets = async (req, res) => {
  try {
    console.log("id:", req.params.courseId);
    const response = await QuestionSets.findAll({
      where: {
        courseId: req.params.courseId,
      },
    });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsBySetId = async (questionSetId) => {
  try {
    const response = await Questions.findAll({
      where: {
        questionSetId: questionSetId,
      },
      attributes: [
        "id",
        "title",
        "choices",
        "answer",
        "explanation",
        "questionSetId",
      ],
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

// create a new question set
export const createQuestionSets = async (req, res) => {
  const { error } = validateQuestionSet(req.body);
  console.log(req.body);
  if (error) {
    console.log("passed error");

    return res.status(400).send({ message: `${error.details[0].message}` });
  }
  console.log("passed here");

  const { title, description, duration, courseId, questions, unitId } =
    req.body;
  try {
    const response = await QuestionSets.create({
      title,
      description,
      duration: JSON.stringify(duration),
      courseId,
      unitId,
    });
    questions.map(async (question) => {
      const { title, choices, answer, explanation } = question;

      await Questions.create({
        title: title,
        choices: JSON.stringify(choices),
        answer: answer,
        questionSetId: response.id,
        explanation: explanation,
      });
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // update existing course
export const updateQuestionSet = async (req, res) => {
  const { error } = validateQuestionSet(req.body);
  if (error) {
    return res.status(400).send({ message: `${error.details[0].message}` });
  }
  const { title, description, year, duration, courseId, questions } = req.body;
  try {
    const response = await QuestionSets.update(
      {
        title,
        description,
        year,
        duration,
        courseId,
      },
      {
        where: {
          id: req.params.questionSetId,
        },
      }
    );

    questions.map(async (question) => {
      const { title, choices, answer, explanation, id, questionSetId } =
        question;

      await Questions.upsert(
        {
          title: title,
          choices: JSON.stringify(choices),
          answer: answer,
          questionSetId: questionSetId,
          explanation: explanation,
        },
        {
          where: {
            id: id,
          },
        }
      );
    });
    const existingQuestions = await getQuestionsBySetId(
      req.params.questionSetId
    );
    const removedQuestions = existingQuestions.filter(
      (question) => !questions.includes(question)
    );
    removedQuestions.map(async (question) => {
      await Questions.destroy({
        where: {
          // criteria
          id: question.id,
        },
      });
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuestionSet = async (req, res) => {
  try {
    const response = await QuestionSets.destroy({
      where: {
        id: req.params.questionSetId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
