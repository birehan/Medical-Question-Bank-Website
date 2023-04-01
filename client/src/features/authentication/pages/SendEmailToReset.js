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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { forgetPassword, cleanUp } from "../actions/users.js";
import { useSelector } from "react-redux";
import Email from "../../../assets/email.svg";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const SendEmailToReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { success, message } = useSelector((state) => state.users);

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
    dispatch(forgetPassword(data));
  };
  useEffect(() => {
    if (success) {
      navigate("/email-sent");
    }
  }, [success]);

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
              Forget Your Password
            </Typography>
            <Typography>Enter your email and select Send Email.</Typography>

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
              <FormControl
                variant="outlined"
                sx={{
                  width: { xs: "300px", sm: "320px", md: "400px" },
                }}
              >
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

              <Stack
                sx={{
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "center",
                  mt: "40px",
                }}
              >
                <Button
                  sx={{ color: "#039198" }}
                  onClick={() => navigate("/login")}
                >
                  cancel
                </Button>
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
                  Send Email
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default SendEmailToReset;
