import React from "react";
import { Stack, Box, Card, Avatar, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm.js";
import { useNavigate } from "react-router-dom";
import useStyles from "../components/Forms/Style.js";
import Stethoscope from "../assets/stethoscope.png";
import Header from "../../../components/Header.js";
import ForgetPasswordForm from "../components/Forms/ForgetPasswordForm.js";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ height: "100vh" }}>
      <Header />
      <Stack
        // className="body-section"
        sx={useStyles.signupContainer}
      >
        <Card sx={useStyles.signupCard}>
          <Box>
            {" "}
            <Avatar
              alt="Stethoscope"
              src={Stethoscope}
              sx={useStyles.heartAvator}
            >
              {/* <CreditScoreIcon /> */}
            </Avatar>
          </Box>
          <Typography>Update Password</Typography>

          <ForgetPasswordForm />
        </Card>
      </Stack>
    </Stack>
  );
};

export default ForgetPasswordPage;
