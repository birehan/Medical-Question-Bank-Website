import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cleanUp } from "../actions/users.js";
import { useDispatch } from "react-redux";
import SignupPic from "../../../assets/signup.png";
import Logo from "../../../assets/logo.png";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.users);
  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(cleanUp());
    }
    return () => {};
  }, [success]);

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        position: "relative",
      }}
    >
      <Box
        onClick={() => {
          navigate("/");
        }}
        component="img"
        alt="logo"
        src={Logo}
        sx={{
          width: "70px",
          height: "70px",
          "&:hover": {
            cursor: "pointer",
          },
          position: "absolute",
          right: "50px",
          top: "30px",
        }}
      ></Box>
      <Box
        sx={{
          flex: "45",
          // border: "3px solid green",
          background: "rgba(230, 243, 255, 0.75)",
          height: "100vh",
          display: { xs: "none", md: "block" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            component="img"
            alt="signup"
            src={SignupPic}
            sx={{ width: "100%", height: "100%" }}
          ></Box>
        </Box>
      </Box>
      <Stack
        sx={{
          flex: "55",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            margin: "30px",
            // border: "1px solid red",
            width: { xs: "90%", sm: "70%", md: "80%", lg: "65%" },
            gap: "50px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              lineHeight: "59px",
              color: "#000000",
              textAlign: "center",
              fontSize: { xs: "42px", md: "42px", lg: "48px" },
            }}
          >
            Sign Up
          </Typography>

          <SignupForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupPage;
