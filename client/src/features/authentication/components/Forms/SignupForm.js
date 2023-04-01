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
import { createUser, cleanUp } from "../../actions/users.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useStyles from "./Style.js";
import GoogleIcon from "../../../../assets/google.png";
import { useNavigate, useLocation } from "react-router-dom";
import HelperText from "../../../../components/HelperText.js";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

const SignupForm = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = useSelector((state) => state.users);
  // const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanUp());
  }, [location, dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    dispatch(
      createUser({
        name: data?.username,
        email: data?.email,
        password: data?.password,
      })
    );
  };

  const googleAuth = async () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  // useEffect(() => {
  //   if (googleCalled) {
  //     dispatch(getLoggedUser());
  //   }
  // }, [googleCalled, dispatch]);

  return (
    <Stack sx={{ width: "100%", gap: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* username start */}
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
        <HelperText text="Username" />
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
            placeholder="Username"
            name="username"
            {...register("username", {
              required: "User name is required",
            })}
            id="outlined-basic username"
          />
          {!!errors.username && (
            <FormHelperText sx={{ mt: "-10px" }} error id="username-error">
              {errors.username && errors.username.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* username end */}

        {/* email field start */}
        <HelperText text="Email" />
        <FormControl variant="outlined" fullWidth>
          <Input
            disableUnderline
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
            disableUnderline
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

        {/* confirm password start */}

        <HelperText text="Confirm Password" />
        <FormControl variant="outlined" fullWidth>
          <Input
            disableUnderline
            sx={{
              m: "15px 0 !important",
              background: "rgba(176, 186, 195, 0.19) !important",
              padding: "10px 16px !important",
              borderRadius: "5px",
            }}
            placeholder="Confirm password"
            name="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            id="outlined-basic confirm password"
          />
          {!!errors.confirmPassword && (
            <FormHelperText
              sx={{ mt: "-10px" }}
              error
              id="confirm password-error"
            >
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormHelperText>
          )}
        </FormControl>
        {/* confirm password end */}
        <Stack
          color="#20839e"
          sx={{ flexDirection: "row", alignItems: "center", ml: "-10px" }}
        >
          <Checkbox
            {...label}
            sx={{
              [`&, &.${checkboxClasses.checked}`]: {
                color: "#20839e",
              },
            }}
            defaultChecked
            required
          />
          <Typography sx={useStyles.orSignupText}>
            I Agree All Statements in Terms of Service
          </Typography>
        </Stack>

        {/* country form field start */}

        <Button sx={useStyles.submitButtonStyle} type="submit">
          Sign Up
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
        <Typography sx={{ fontSize: "1.1rem" }}>Sign Up With Google</Typography>
      </Stack>

      <Stack
        sx={{
          margin: "20px 0",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Typography>Have an account?</Typography>
        <Typography
          onClick={() => navigate("/login")}
          sx={{
            fontWeight: "bold",
            color: "#078989",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Log In
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
