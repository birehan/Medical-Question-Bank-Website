import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useStyles from "./Style.js";
import HomePic from "../assets/home.png";
import GetStartedDot from "../assets/get_start_dot.png";
import BottomCurve from "../assets/home_bottom_curve.png";

const LandingPage = () => {
  const classes = useStyles().__emotion_base;
  const navigate = useNavigate();

  return (
    <Stack title="Settings" sx={classes?.homepage}>
      <Header />
      <Stack className={classes?.root} sx={classes?.homeContent}>
        <Stack sx={classes?.homeTextContainer}>
          <Stack sx={classes?.homeTextCotent}>
            <Typography sx={classes?.medicalText}>
              Medical Question Bank
            </Typography>
            <Typography sx={classes?.detailText}>
              Are you ready to ace your medical exams? Our <br />
              comprehensive question bank is here to help!
              <br />
              sign up now and start practicing with <br />
              confidence
            </Typography>
            <Box sx={{ position: "relative", border: "1px solid gree" }}>
              <Button
                title="Get Started"
                onClick={() => navigate("/signup")}
                sx={classes?.getStartButton}
              >
                Get Started
              </Button>
              <Box
                component="img"
                alt="dot"
                src={GetStartedDot}
                sx={classes.getStartDot}
              ></Box>
            </Box>
          </Stack>
        </Stack>
        <Box sx={classes?.homeImageContainer}>
          <Box sx={classes?.homeImageContent}>
            <Box
              sx={classes?.homeImage}
              component="img"
              src={HomePic}
              alt="home pic"
            ></Box>
          </Box>
        </Box>
        <Box
          sx={classes.bottomCurve}
          component="img"
          alt="curve"
          src={BottomCurve}
        ></Box>
      </Stack>
    </Stack>
  );
};

export default LandingPage;
