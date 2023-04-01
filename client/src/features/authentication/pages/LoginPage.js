import React from "react";
import { Stack, Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";
import LoginPic from "../../../assets/login.png";
import LoginForm from "../components/Forms/LoginForm.js";
import Logo from "../../../assets/logo.png";
import Header from "../../../components/Header.js";

const LoginPage = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        position: "relative",
      }}
    >
      {isMatch ? (
        <Header />
      ) : (
        <Box
          onClick={() => {
            navigate("/");
          }}
          component="img"
          alt="logo"
          src={Logo}
          sx={{
            width: "50px",
            height: "50px",
            "&:hover": {
              cursor: "pointer",
            },
            position: "absolute",
            right: { xs: "80vw", md: "50px" },
            top: "30px",
          }}
        ></Box>
      )}

      <Box
        sx={{
          flex: "45",
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
            width: { xs: "90%", sm: "70%", md: "80%", lg: "65%" },
            gap: "50px",
            margin: { xs: "120px 30px 30px", md: "30px" },
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
            Login
          </Typography>
          <LoginForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
