import { Courses, validateCourse } from "../models/CourseModel.js";
import fs from "fs";

// create course
export const getCourses = async (req, res) => {
  try {
    let response = await Courses.findAll({
      attributes: ["id", "title", "image", "description"],
      order: [["title", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get course by Id
export const getCourseById = async (req, res) => {
  const course = await Courses.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "image", "description"],
  });
  if (!course) return res.status(404).json({ message: "Course not found" });
  return res.status(200).json(course);
};

// create a new course
export const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const { filename } = req.file;

  if (!title || !filename || !description) {
    res.status(422).json({ status: 422, message: "fill all the details" });
  }

  try {
    const response = await Courses.create({
      title,
      description,
      image: filename,
    });
    res.status(200).send(response);
  } catch (error) {
    return res.send({ message: error.message });
  }
};

// update existing course
export const updateCourse = async (req, res) => {
  const course = await Courses.findByPk(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send({ message: `${error.details[0].message}` });
  }
  const { title, description } = req.body;
  try {
    // Delete previous image if a new image is uploaded
    if (req.file) {
      fs.unlinkSync(`uploads/${course.image}`);
    }
    await course.update({
      title,
      description,
      image: req?.file?.filename || course.image, // Use the existing image if no new image is uploaded
    });

    res.status(200).json(course);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// delete course
export const deleteCourse = async (req, res) => {
  console.log(req.params.id);
  const course = await Courses.findByPk(req.params.id);

  if (!course) return res.status(404).json({ message: "Course not found" });
  try {
    await course.destroy();
    res.status(200).send(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
