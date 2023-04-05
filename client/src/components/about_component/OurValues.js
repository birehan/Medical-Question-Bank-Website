import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ValueImg from "../../assets/Value.png";

const OurValues = () => {
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
            src={ValueImg}
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
            Our Values
          </Typography>
          <Typography
            sx={{
              letterSpacing: "0.1em",
              fontFamily: "Poppins",
              lineHeight: "1.6rem",
            }}
          >
            Our approach prioritizes active engagement through question bank
            practice for medical students to gain mastery of exam material. Our
            core principles include passion, high standards, simplicity, and
            bringing groundbreaking change to med school. We work passionately
            to inspire a love for medicine and provide comprehensive and
            accessible resources to help students reach their full potential.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default OurValues;
