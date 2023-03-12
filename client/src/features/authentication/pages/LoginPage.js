import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cleanUp } from "../actions/users.js";
import { useDispatch } from "react-redux";
import LoginPic from "../../../assets/login.png";
import LoginForm from "../components/Forms/LoginForm.js";

const LoginPage = () => {
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
      }}
    >
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
            alt="login"
            src={LoginPic}
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
            width: { xs: "90%", sm: "70%", md: "80%", lg: "65%" },
            gap: "50px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              lineHeight: "59px",
              color: "#000000",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <LoginForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
