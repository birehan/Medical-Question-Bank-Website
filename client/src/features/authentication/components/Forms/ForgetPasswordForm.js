import React, { useState, useEffect } from "react";

import { TextField, Button, Stack, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser, getLoggedUser } from "../../actions/users.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useStyles from "./Style.js";
import { useNavigate } from "react-router-dom";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

const HelperText = ({ text }) => {
  return (
    <FormHelperText
      sx={{
        mb: "-15px",
        fontSize: "16px",
        color: "#20839e",
        opacity: "1",
        fontWeight: "bold",
      }}
    >
      {text}
    </FormHelperText>
  );
};
const ForgetPasswordForm = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [googleCalled, setGoogleCalled] = useState(false);
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        email: data?.email,
        password: data?.password,
      })
    );
  };

  const googleAuth = async () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
    setGoogleCalled(true);
  };

  useEffect(() => {
    if (googleCalled) {
      dispatch(getLoggedUser());
    }
  }, [googleCalled]);

  return (
    <Stack sx={{ width: "100%" }}>
      {/* {message ? (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {message}
        </Typography>
      ) : (
        ""
      )} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email field start */}
        <HelperText text="Email" />
        <TextField
          sx={{ mb: "15px !important" }}
          placeholder="Email"
          name="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          error={Boolean(
            errors.email || message === "user with this email already exists."
          )}
          helperText={
            (errors.email && errors.email.message) ||
            (message === "user with this email already exists." && message)
          }
          fullWidth
          margin="normal"
          variant="outlined"
          id="outlined-basic email"
        />
        {/* email field end */}
        {/* password field start*/}

        {/* country form field start */}
        <Button sx={useStyles.submitButtonStyle} type="submit">
          Send Mail
        </Button>
      </form>
    </Stack>
  );
};

export default ForgetPasswordForm;
