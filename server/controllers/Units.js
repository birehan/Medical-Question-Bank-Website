import { Units } from "../models/UnitModel.js";
import { Courses } from "../models/CourseModel.js";

export const createUnit = async (req, res) => {
  const { title, courseId } = req.body;
  if (!title || !courseId) {
    res.status(422).json({ status: 422, message: "fill all the details" });
  }

  const course = await Courses.findOne({
    where: {
      id: courseId,
    },
  });
  if (!course) return res.status(404).json({ message: "Course not found" });

  try {
    const response = await Units.create({
      title,
      courseId,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUnits = async (req, res) => {
  try {
    let response = await Units.findAll({
      order: [["title", "ASC"]],
      attributes: ["id", "title", "courseId"],
    });
    res.status(200).json(response);
  } catch (error) {
  res.status(500).json({ message: error.message });
  }
};

export const getUnits = async (req, res) => {
  const course = await Courses.findOne({
    order: [["title", "ASC"]],
    where: {
      id: req.params.courseId,
    },
  });

  if (!course) return res.status(404).json({ message: "Course not found" });
  try {
    let response = await Units.findAll({
      order: [["title", "ASC"]],

      attributes: ["id", "title", "courseId"],
      where: {
        courseId: req.params.courseId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnitById = async (req, res) => {
  const unit = await Units.findOne({
    attributes: ["id", "title", "courseId"],
    where: {
      id: req.params.id,
    },
  });
  if (!unit) return res.status(404).json({ message: "Unit not found" });
  res.status(200).json(unit);
};

export const updateUnit = async (req, res) => {
  let unit = await Units.findOne({ where: { id: req.params.id } });
  if (!unit) return res.status(404).json({ message: "Unit not found" });

  const { title, courseId } = req.body;
  if (!title || !courseId) {
    res.status(422).json({ status: 422, message: "fill all the details" });
  }

  const course = await Courses.findOne({ where: { id: courseId } });
  if (!course) return res.status(404).json({ message: "Course Not Found." });

  try {
    await Units.update(
      {
        title: title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(201).json({
      id: parseInt(req.params.id),
      title: title,
      courseId: courseId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUnit = async (req, res) => {
  const unit = await Units.findOne({ where: { id: req.params.id } });
  if (!unit) return res.status(404).json({ message: "Unit not found" });

  try {
    const response = await Units.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
