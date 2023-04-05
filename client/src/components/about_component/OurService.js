import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ServiceImg from "../../assets/service.png";

const OurService = () => {
  return (
    <Box
      className="about-container"
      sx={{
        // background: "white",
        height: { xs: "fit-content", lg: "400px" },
        "&:after": {
          borderColor: "white transparent transparent transparent",
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row-reverse",
          },
          width: { xs: "95%", sm: "80%", md: "90%", lg: "80%", xl: "70%" },

          //   border: "2px solid green",
          height: "100%",
          margin: "auto",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "30px 0", lg: "0" },
        }}
      >
        <Box
          sx={{
            flex: "1",
            margin: { xs: "30px", md: "30px" },
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="Our Mission"
            src={ServiceImg}
            style={{
              width: "100%",
              maxWidth: "550px",
              objectFit: "contain",
              maxHeight: "320px",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: "1",
            margin: { xs: "0 30px 30px", md: "30px" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: { xs: "30px", md: "34px", lg: "30px" },
              lineHeight: "160.9%",
              letterSpacing: "0.01em",
              color: "#00b5be",
              textAlign: { xs: "center", md: "left" },
              mb: "10px",
            }}
          >
            What we provide
          </Typography>
          <Typography
            sx={{
              letterSpacing: "0.1em",
              fontFamily: "Poppins",
              lineHeight: "1.6rem",
            }}
          >
            Our current service provides several features such as a vast
            collection of questions from various universities, prompt live
            answers to each question, well-organized questions for user
            convenience, and frequent updates. All the questions are based on
            real test questions from previous exams and are presented in a
            user-friendly interface to prepare you adequately for future exams.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default OurService;
