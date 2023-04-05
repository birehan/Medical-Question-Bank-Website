import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import MissionImg from "../../assets/mission.png";

const OurMission = () => {
  return (
    <Box
      className="about-container"
      sx={{
        background: "white",
        height: { xs: "fit-content", md: "400px" },
        "&:after": {
          borderColor: "#f6f9fa transparent transparent transparent",
        },
      }}
    >
      <Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: { xs: "90%", sm: "80%", md: "90%", lg: "80%", xl: "70%" },

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
            src={MissionImg}
            style={{
              width: "100%",
              maxWidth: "550px",
              objectFit: "contain",
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
            Our Mission
          </Typography>
          <Typography
            sx={{
              letterSpacing: "0.1em",
              fontFamily: "Poppins",
              lineHeight: "1.6rem",
            }}
          >
            Our mission is to empower medical students across the globe to
            achieve better. By creating a system of self-paced learning through
            available technology, we strive to equip each student with the tools
            they need to confidently take their examinations and pursue success
            in their careers as healthcare professionals.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default OurMission;
