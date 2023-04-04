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
    const response = await QuestionSets.findAll({
      where: {
        courseId: req.params.courseId,
      },
    });
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
  if (error) {
    return res.status(400).send({ message: `${error.details[0].message}` });
  }
  const { title, description, duration, courseId, questions, unitId } =
    req.body;
  try {
    const response = await QuestionSets.create({
      title,
      description,
      duration: JSON.stringify(duration),
      courseId,
      unitId,
      questionCount: questions?.length,
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
  const { title, description, year, duration, courseId, questions, unitId } =
    req.body;
  try {
    const response = await QuestionSets.update(
      {
        title,
        description,
        year,
        duration: JSON.stringify(duration),
        courseId,
        unitId,
        questionCount: questions?.length,
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
    res.status(200).json(req.params.questionSetId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // update existing course
export const updateLike = async (req, res) => {
  try {
    const questionSet = await QuestionSets.findByPk(req.body.id);

    if (!questionSet) {
      if (!questionSet)
        return res.status(404).json({ message: "questionSet not found" });
    }
    let updatedLikes = questionSet?.likes?.length ? questionSet.likes : [];

    if (!updatedLikes.includes(req.body.userId)) {
      updatedLikes.push(req.body.userId);
    } else {
      updatedLikes = updatedLikes.filter((like) => like != req.body.userId);
    }

    await questionSet.update({ likes: updatedLikes });

    const response = await QuestionSets.update(
      {
        likes: updatedLikes,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.status(200).json({ likes: updatedLikes, id: req.body.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
