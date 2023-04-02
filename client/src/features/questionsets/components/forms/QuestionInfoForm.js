import React, { useEffect, useState } from "react";

import {
  Stack,
  Box,
  Typography,
  Input,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import SubjectIcon from "@mui/icons-material/Subject";
import FormControl from "@mui/material/FormControl";

import RectangleIcon from "@mui/icons-material/Rectangle";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import TimeForm from "./TimeForm";
import { getAllUnits } from "../../../units/actions/units";
import { getCourses } from "../../../courses/actions/courses";
import { useDispatch } from "react-redux";
import HelperText from "../../../../components/HelperText";

const QuestionInfoForm = ({ register, errors, watch }) => {
  const dispatch = useDispatch();

  const { courses, units } = useSelector((state) => state.courses);

  useEffect(() => {
    if (!courses || !units) {
      dispatch(getCourses());
      dispatch(getAllUnits());
    }
  }, []);

  const [selectedCourseId, setselectedCourseId] = useState(
    watch(`courseId`) || courses[0]?.id
  );

  const [courseUnits, setcourseUnits] = useState(
    units.filter((unit) => unit?.courseId === selectedCourseId)
  );

  useEffect(() => {
    setcourseUnits(units.filter((unit) => unit?.courseId === selectedCourseId));
  }, [units, selectedCourseId]);

  return (
    <Stack
      sx={{
        flex: 1,
        background: "white",
        padding: "20px 30px 10px",
        borderRadius: "10px",
      }}
    >
      <Stack sx={{ gap: "15px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", opacity: "0.6" }}>
          Exam Information
        </Typography>
        <Typography sx={{ fontSize: "0.9rem", fontFamily: "Poppins" }}>
          Enter information about the exam
        </Typography>
        <Stack sx={{ flexDirection: "column", gap: "30px" }}>
          <TimeForm register={register} errors={errors} />
          <FormControl variant="standard">
            <Input
              disableUnderline
              //   sx={{ width: "100px" }}
              placeholder="Title"
              type="text"
              {...register("title", {
                required: "title is required",
              })}
              error={Boolean(errors.title)}
              value={register.title}
              variant="outlined"
              id="outlined-basic title"
              startAdornment={
                <InputAdornment position="start">
                  <RectangleIcon />
                </InputAdornment>
              }
              sx={{
                background: "#f6f9fa",
                padding: "3px 15px",
                borderRadius: "5px",
                //   fontWeight: "bold",
              }}
            />
            {!!errors.title && (
              <FormHelperText error id="title-error">
                {errors.title && errors.title.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl variant="standard">
            <Input
              multiline
              // maxRows={6}
              minRows={6}
              disableUnderline
              //   sx={{ width: "100px" }}
              placeholder="Description"
              type="text"
              {...register("description", {
                required: "description is required",
              })}
              value={register.description}
              variant="outlined"
              id="outlined-basic description"
              startAdornment={
                <InputAdornment position="start" sx={{ mt: "12px" }}>
                  <SubjectIcon />
                </InputAdornment>
              }
              sx={{
                background: "#f6f9fa",
                padding: "10px 15px",
                borderRadius: "5px",
                alignItems: "flex-start",
              }}
            />
            {!!errors.description && (
              <FormHelperText error id="description-error">
                {errors.description && errors.description.message}
              </FormHelperText>
            )}
          </FormControl>

          <Stack>
            <HelperText text="Course" />
            <FormControl fullWidth>
              <Select
                displayEmpty
                id="demo-simple-select"
                value={register.courseId}
                defaultValue={watch(`courseId`) || courses?.[0]?.id}
                {...register("courseId", {
                  required: "Course is required",
                  onChange: (event) => {
                    // dispatch(getUnits(event.target.value));
                    setselectedCourseId(event.target.value);
                  },
                })}
                sx={{
                  background: "#f6f9fa",
                  border: "none !important",
                  mt: "15px",
                }}
              >
                {courses
                  ? courses?.map((course, index) => {
                      return (
                        <MenuItem value={course?.id} key={index}>
                          {course?.title}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
              {!!errors.courseId && (
                <FormHelperText sx={{}} error id="courseId-error">
                  {errors.courseId && errors.courseId.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack>
            <HelperText text="Unit" />
            <FormControl fullWidth>
              <Select
                displayEmpty
                id="demo-simple-select"
                value={register.unitId}
                defaultValue={watch(`unitId`) || courseUnits?.[0]?.id}
                {...register("unitId", {
                  required: "Unit is required",
                })}
                sx={{
                  background: "#f6f9fa",
                  border: "none !important",
                  mt: "15px",
                }}
              >
                {courseUnits
                  ? courseUnits?.map((unit, index) => {
                      return (
                        <MenuItem value={unit?.id} key={index}>
                          {unit?.title}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
              {!!errors.unitId && (
                <FormHelperText sx={{}} error id="unitId-error">
                  {errors.unitId && errors.unitId.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Stack>
        <Box
          sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
        ></Box>
      </Stack>
    </Stack>
  );
};

export default QuestionInfoForm;
