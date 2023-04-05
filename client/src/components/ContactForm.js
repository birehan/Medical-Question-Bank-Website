import React, { useState, useEffect } from "react";

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
import {
  sendMessage,
  cleanUp,
} from "../features/authentication/actions/users.js";
import ToastAlert from "./ToastAlert.js";

const ContactForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { message, success, failed } = useSelector((state) => state.users);
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

  useEffect(() => {
    if (success) {
      setSeverity("success");
      setAlertMessage(message);
      setOpenToast(true);
      dispatch(cleanUp());
    }
    if (failed) {
      setSeverity("failed");
      setAlertMessage(message);
      setOpenToast(true);
      dispatch(cleanUp());
    }
  }, [success]);

  return (
    <Stack
      sx={{
        padding: { xs: "20px", md: "20px 50px 50px" },
        width: { xs: "90%", sm: "90%", lg: "70%" },
      }}
    >
      {openToast && (
        <ToastAlert
          openToast={openToast}
          setOpenToast={setOpenToast}
          message={alertMessage}
          severity={severity}
        />
      )}

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

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Stack>
          {/* email field start */}
          <FormControl variant="outlined" fullWidth>
            <Input
              disableUnderline={true}
              type={"text"}
              sx={{
                m: "15px 0 !important",
                background: "rgba(176, 186, 195, 0.19) !important",
                padding: "13px 16px !important",
                borderRadius: "5px",
              }}
              placeholder="Username"
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
              disableUnderline={true}
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
              disableUnderline={true}
              //   sx={{ width: "100px" }}
              placeholder="Your Message"
              type="text"
              {...register("message", {
                required: "message is required",
              })}
              value={register.message}
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
