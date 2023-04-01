import React from "react";
import { Stack, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SignupForm from "../components/Forms/SignupForm.js";
import { useNavigate } from "react-router-dom";
import SignupPic from "../../../assets/signup.png";
import Logo from "../../../assets/logo.png";
import Header from "../../../components/Header.js";

const SignupPage = () => {
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
            margin: { xs: "120px 30px 30px", md: "30px" },
            width: { xs: "90%", sm: "70%", md: "80%", lg: "65%" },
            gap: "30px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              lineHeight: "59px",
              color: "#000000",
              textAlign: "center",
              fontSize: { xs: "36px", md: "42px", lg: "44px" },
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
