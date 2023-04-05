import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FounderImg from "../../assets/ourfounders.png";

const OurFounders = () => {
  return (
    <Box
      className="about-container"
      sx={{
        background: "white",
        height: { xs: "fit-content", xl: "450px" },

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
            src={FounderImg}
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
            Our Founders
          </Typography>
          <Typography
            sx={{
              letterSpacing: "0.1em",
              fontFamily: "Poppins",
              lineHeight: "1.6rem",
            }}
          >
            {/* Medical Question Bank was established in 2021 by Tsegaw Molla, a
            medical student at Addis Ababa University. He formed a team of
            passionate medical students to help classmates prepare for exams by
            uploading questions to a Telegram channel. The channel became
            popular and demanded more efficient management, so in 2023, it was
            upgraded to a website for users to access more detailed and
            organized study material. Today, Medical Question Bank is one of the
            first of its kind in the country, and the founders aim to improve
            the community and make learning easier for everyone. */}
            Medical Question Bank was established in 2021 by Tsegaw Molla, a
            medical student in Ethiopia. He formed a team to help classmates
            prepare for exams by sharing questions on a Telegram channel. They
            upgraded to a website in 2023 to manage information and provide more
            detailed study material. Medical Question Bank is now a pioneer in
            its field in Ethiopia, and the founders remain dedicated to
            improving the community and promoting accessible learning.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default OurFounders;
