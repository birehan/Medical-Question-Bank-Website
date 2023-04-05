import React from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useStyles from "./Style.js";
import HomeVector from "../assets/homepage_image.png";

import GetStartedDot from "../assets/get_start_dot.png";
import BottomCurve from "../assets/home_bottom_curve.png";

const services = [
  {
    title: "2000+",
    description: "Questions from all the major courses in medical school.",
  },
  {
    title: "10+",
    description: "Ethiopian medical school university questions included.",
  },
  {
    title: "100+",
    description: "Questions uploaded weekly.",
  },
];

const LandingPage = () => {
  const classes = useStyles().__emotion_base;
  const navigate = useNavigate();

  return (
    <Stack sx={classes?.homepage}>
      <Header />
      <Stack sx={classes?.homeContent}>
        <Stack sx={classes?.homeTextContainer}>
          <Stack sx={classes?.homeTextCotent}>
            <Typography sx={classes?.medicalText}>
              Medical Question Bank
            </Typography>
            <Typography sx={classes?.detailText}>
              Where Practice is Perfected!
              {/* Are you ready to ace your medical exams? Our comprehensive
              question bank is here to help! sign up now and start practicing
              with confidence */}
              {/* Ready to excel in medical exams? Practice confidently with our
              comprehensive question bank. Sign up now. */}
              {/* Ace medical exams with our question bank. Sign up now. */}
              <br />
              Are you ready to ace your medical exams? Our comprehensive
              question bank is here to help! sign up now and start practicing
              with confidence
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
              src={HomeVector}
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
      <Box sx={{ textAlign: "center", margin: "0px 20px 20px" }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: { xs: "26px", md: "30px", lg: "34px" },

            color: "black",
          }}
        >
          Our Site Provides
        </Typography>
      </Box>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: "20px", md: "40px", lg: "60px" },
          margin: { xs: "20px auto 50px", md: "20px auto 100px" },
          flexWrap: "wrap",
        }}
      >
        {services.map((service, index) => {
          return (
            <Stack
              key={index}
              sx={{
                gap: "20px",
                height: "200px",
                width: "250px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                // border: "1px solid #00b5be",
                padding: "30px",
                borderRadius: "10px",
                color: "#00b5be",
                background: "white",

                "&:hover": {
                  cursor: "pointer",
                  background: "#29d4dd",
                  color: "black !important",
                },
                boxShadow: "0px 0px 40px -25px rgba(0, 0, 0, 0.5)",
                transition: "400ms all ease-in",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: { xs: "24px", md: "26px", lg: "28px" },
                  lineHeight: "160.9%",
                  letterSpacing: "0.01em",
                  height: "50px",
                }}
              >
                {service.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "20px",
                  lineHeight: "169.4%",
                  /* or 77px */

                  letterSpacing: "0.07em",

                  color: "black",
                  flex: "1",
                }}
              >
                {service.description}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default LandingPage;
