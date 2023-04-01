import React, { useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Card,
  Typography,
  FormControl,
  Input,
  FormHelperText,
} from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Email from "../../../assets/email.svg";
import { useForm } from "react-hook-form";
import { resetPassword, cleanUp } from "../actions/users";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import HelperText from "../../../components/HelperText.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const { success, message } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(cleanUp());
  }, [location, dispatch]);

  useEffect(() => {
    if (success && message === "success") {
      navigate("/login");
    }
  }, [message, success]);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      token: token,
    },
  });

  const onSubmit = (data) => {
    const reset = {
      token: data.token,
      password: data.password,
    };
    dispatch(resetPassword(reset));
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Stack
        sx={{
          borderColor: "#f6f9fa !important",
          margin: "150px 30px 50px",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Card
          sx={{
            //   border: "1px solid silver",
            boxShadow: " 0px 0px 40px -25px rgba(0, 0, 0, 0.5)",
            height: "100%",
            overflow: "auto",
            margin: " 30px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "600px" },
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              margin: "50px 20px",
              width: { xs: "100%", md: "600px" },
            }}
          >
            <Box
              component="img"
              src={Email}
              sx={{
                width: "200px",
                height: "200px",
              }}
            ></Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "24px", md: "30px", lg: "30px" },
              }}
            >
              Reset Password
            </Typography>

            <form style={{ width: "90%" }} onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Enter new password"
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
                  <FormHelperText
                    sx={{ mt: "-10px" }}
                    error
                    id="password-error"
                  >
                    {errors.password && errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* password field ned*/}

              {/* confirm password start */}

              <HelperText text="Confirm Password" />
              <FormControl variant="outlined" fullWidth>
                <Input
                  disableUnderline="false"
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

              <Stack
                sx={{
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "center",
                  mt: "40px",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    background: "#039198",
                    color: "white",
                    "&:hover": {
                      background: "#039198",
                      opacity: "0.8",
                    },
                    padding: "6px 20px",
                  }}
                >
                  Save Password
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default ResetPassword;
