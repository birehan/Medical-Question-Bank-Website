import React from "react";

import {
  Button,
  Stack,
  FormHelperText,
  Input,
  Typography,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useStyles from "../features/authentication/components/Forms/Style.js";
// import { cleanUp, createCourse, updateCourse } from "../actions/courses.js";
import { sendMessage } from "../features/authentication/actions/users.js";

const ContactForm = ({ course }) => {
  const { message, success } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    dispatch(sendMessage(data));
  };

  return (
    <Stack
      sx={{
        padding: { xs: "20px", md: "20px 50px 50px" },
        width: { xs: "90%", sm: "90%", lg: "80%" },
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "22px", sm: "27px", md: "32px" },
          fontWeight: "bold",
          mb: "30px",
        }}
      >
        Leave us a message
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <Stack>
          {/* email field start */}
          <FormControl variant="outlined" fullWidth>
            <Input
              disableUnderline
              type={"text"}
              sx={{
                m: "15px 0 !important",
                background: "rgba(176, 186, 195, 0.19) !important",
                padding: "13px 16px !important",
                borderRadius: "5px",
              }}
              placeholder="Enter username"
              name="username"
              {...register("username", {
                required: "username is required",
              })}
              id="outlined-basic title"
            />
            {!!errors.username && (
              <FormHelperText sx={{ mt: "-10px" }} error id="username-error">
                {errors.username && errors.username.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <Input
              disableUnderline="false"
              sx={{
                m: "15px 0 !important",
                background: "rgba(176, 186, 195, 0.19) !important",
                padding: "13px 16px !important",
                borderRadius: "5px",
              }}
              placeholder="Email Address"
              name="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              id="outlined-basic email"
            />
            {!!errors.email && (
              <FormHelperText sx={{ mt: "-10px" }} error id="email-error">
                {errors.email && errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl variant="standard" fullWidth>
            <Input
              multiline
              // maxRows={6}
              minRows={7}
              disableUnderline
              //   sx={{ width: "100px" }}
              placeholder="Your Message"
              type="text"
              {...register("message", {
                required: "message is required",
              })}
              value={register.message}
              margin="normal"
              variant="outlined"
              id="outlined-basic message"
              sx={{
                background: "#f6f9fa",
                padding: "10px 15px",
                borderRadius: "5px",
                alignItems: "flex-start",
                mt: "15px",
              }}
            />
            {!!errors.message && (
              <FormHelperText error id="message-error">
                {errors.message && errors.message.message}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>

        <Button sx={useStyles.submitButtonStyle} type="submit">
          Send
        </Button>
      </form>
    </Stack>
  );
};

export default ContactForm;
