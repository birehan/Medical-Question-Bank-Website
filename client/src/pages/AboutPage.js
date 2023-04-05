import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Header from "../components/Header";
import OurMission from "../components/about_component/OurMission";
import OurValues from "../components/about_component/OurValues";
import OurFounders from "../components/about_component/OurFounders";
import OurService from "../components/about_component/OurService";
import Footer from "../components/Footer.js";

const AboutPage = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#f6f9fa !important",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <Stack
        sx={{
          borderColor: "#f6f9fa !important",
          backgroundColor: "#f6f9fa !important",
          marginTop: "80px",
          border: "3px solid green",
          marginBottom: "50px",
        }}
      >
        <Stack
          sx={{
            margin: { xs: "30px 20px 30px", md: "40px 20px 40px" },
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",

              color: "#1B3758",
              fontSize: { xs: "28px", md: "32px", lg: "36px" },
              textAlign: "center",
            }}
          >
            About Us
          </Typography>
        </Stack>
        <OurMission />
        <OurValues />
        <OurFounders />
        <OurService />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default AboutPage;
