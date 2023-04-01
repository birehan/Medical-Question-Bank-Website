import React, { useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Divider,
  Input,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser, cleanUp } from "../../actions/users.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useStyles from "./Style.js";
import GoogleIcon from "../../../../assets/google.png";
import { useNavigate, useLocation } from "react-router-dom";
import HelperText from "../../../../components/HelperText.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanUp());
  }, [location, dispatch]);

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
  };

  return (
    <Stack sx={{ width: "100%", gap: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {message && (
          <Typography
            sx={{
              color: "red",
              textAlign: "center",
              mb: "10px",
            }}
          >
            {message}
          </Typography>
        )}
        {/* email field start */}
        <HelperText text="Email" />
        <FormControl variant="outlined" fullWidth>
          <Input
            disableUnderline="false"
            sx={{
              m: "15px 0 !important",
              background: "rgba(176, 186, 195, 0.19) !important",
              padding: "10px 16px !important",
              borderRadius: "5px",
            }}
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
            id="outlined-basic email"
          />
          {!!errors.email && (
            <FormHelperText sx={{ mt: "-10px" }} error id="email-error">
              {errors.email && errors.email.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* email field end */}

        {/* password field start*/}
        <HelperText text="Password" />
        <FormControl variant="outlined" fullWidth>
          <Input
            sx={{
              m: "15px 0 !important",
              background: "rgba(176, 186, 195, 0.19) !important",
              padding: "10px 16px !important",
              borderRadius: "5px",
            }}
            disableUnderline="false"
            placeholder="Password"
            name="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            id="outlined-basic password"
          />
          {!!errors.password && (
            <FormHelperText sx={{ mt: "-10px" }} error id="password-error">
              {errors.password && errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* password field ned*/}
        <Box
          onClick={() => navigate("/forget-password")}
          sx={{
            margin: "20px",
            textAlign: "center",
            color: "#00b5be",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Forget Password?</Typography>
        </Box>

        <Button sx={useStyles.submitButtonStyle} type="submit">
          Login
        </Button>
      </form>
      <Divider sx={{ height: "12px", width: "100%", mb: "20px" }}>Or</Divider>

      <Stack
        onClick={googleAuth}
        sx={{
          flexDirection: "row",
          border: "1px solid green",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 10px",
          borderRadius: "10px",
          width: { xs: "80%", sm: "70%", md: "60%" },
          alignSelf: "center",
          "&:hover": {
            cursor: "pointer",
            color: "#078989",
            background: "#f4fcff",
            transition: "400ms all ease-in",
          },
        }}
      >
        <Box
          sx={{ width: "24px" }}
          component="img"
          alt="google"
          src={GoogleIcon}
        ></Box>
        <Typography sx={{ fontSize: "1.1rem" }}>Sign In With Google</Typography>
      </Stack>

      <Stack
        sx={{
          margin: "20px 0",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Typography>Don’t you have an account?</Typography>
        <Typography
          onClick={() => navigate("/signup")}
          sx={{
            fontWeight: "bold",
            color: "#078989",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Sign Up
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
