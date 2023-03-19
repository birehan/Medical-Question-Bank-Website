import React, { useState, useEffect } from "react";

import {
  Button,
  Stack,
  FormHelperText,
  Input,
  Typography,
  Divider,
  FormControl,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useStyles from "../../authentication/components/Forms/Style.js";
import { useNavigate } from "react-router-dom";
import { cleanUp, createCourse, updateCourse } from "../actions/courses.js";
import HelperText from "../../../components/HelperText.js";

const CourseForm = ({ course }) => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();

  const { message, success } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: course?.title,
      description: course?.description,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", course?.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", image);

    if (!course) {
      dispatch(createCourse(formData));
    } else {
      dispatch(updateCourse(formData));
    }
  };

  useEffect(() => {
    if (success === true) {
      navigate("/home");
      dispatch(cleanUp());
    }
  }, [success]);

  return (
    <Stack sx={{ padding: { xs: "20px", md: "50px" } }}>
      {/* {message ? (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {message}
      ) : (
        ""
      )} */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "22px", sm: "27px", md: "32px" },
          fontWeight: "bold",
        }}
      >
        {course ? "Update Course" : "Create Course"}
      </Typography>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <Stack sx={{ gap: "20px" }}>
          <Stack sx={{ mt: "20px", gap: "20px" }}>
            <HelperText text={"Course Image"} />
            <input
              onChange={(event) => {
                setImage(event.target.files[0]);
                setImageName(event.target.files[0].name);
              }}
              id="upload-image"
              style={{ display: "none" }}
              type="file"
              className="input"
              accept="image/*"
            />
            <label
              style={{
                display: " block",
                position: "relative",
                backgroundColor: "#039198",
                color: "#ffffff",
                textAlign: "center",
                fontSize: "18px",
                width: "100%",
                padding: "12px 0",
                margin: "0px auto 0",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              htmlFor="upload-image"
            >
              {imageName ? (
                imageName
              ) : (
                <Box>
                  <i className="fas fa-upload"></i> &nbsp; Choose A Photo
                </Box>
              )}
            </label>
          </Stack>

          {/* email field start */}
          <Stack>
            <HelperText text="Course Name" />
            <FormControl variant="outlined" fullWidth>
              <Input
                disableUnderline
                type={"text"}
                sx={{
                  m: "15px 0 !important",
                  background: "rgba(176, 186, 195, 0.19) !important",
                  padding: "10px 16px !important",
                  borderRadius: "5px",
                }}
                placeholder="Course name"
                name="title"
                {...register("title", {
                  required: "Course name is required",
                })}
                id="outlined-basic title"
              />
              {!!errors.title && (
                <FormHelperText sx={{ mt: "-10px" }} error id="title-error">
                  {errors.title && errors.title.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack>
            <HelperText text={"Description"} />
            <FormControl variant="standard" fullWidth>
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
                margin="normal"
                variant="outlined"
                id="outlined-basic description"
                sx={{
                  background: "#f6f9fa",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  alignItems: "flex-start",
                  mt: "15px",
                }}
              />
              {!!errors.description && (
                <FormHelperText error id="description-error">
                  {errors.description && errors.description.message}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Stack>

        <Button sx={useStyles.submitButtonStyle} type="submit">
          {course ? "Update Course" : "Create Course"}
        </Button>
      </form>
    </Stack>
  );
};

export default CourseForm;
