import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import ContactImg from "../assets/contact.png";

const ContactPage = () => {
  return (
    <Box
      className="home-container"
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <Stack
        sx={{
          //   flexDirection: { xs: "column-reverse", md: "row" },
          width: "100vw",
          height: { xs: "fit-content", md: "70vh" },
          margin: "80px 0px 20px",
        }}
      >
        <Box
          sx={{
            margin: { xs: "50px 20px 10px", md: "50px 20px 20px" },
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
            Get In Touch
          </Typography>
        </Box>

        <Stack
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            width: "100vw",
            height: { xs: "fit-content" },
            // border: "3px solid green",
            margin: "auto",
          }}
        >
          <Stack
            sx={{
              //   flex: 4,
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "95%", md: "50%", xl: "50%" },
              margin: "auto",
            }}
          >
            <ContactForm />
          </Stack>

          <Box
            sx={{
              width: { xs: "100%", md: "50%", xl: "50%" },

              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: { xs: "100vw", sm: "70vw", md: "100%" },
                display: "flex",
                justifyContent: { xs: "center", md: "start" },
                alignItems: "center",
                margin: { xs: "30px 30px 0", md: "0px 50px 0 0" },
                height: "100%",
              }}
            >
              <Box
                sx={{
                  //   objectFit: "contain",
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "700px",
                    xl: "900px",
                  },
                  height: "100%",
                }}
                component="img"
                src={ContactImg}
                alt="conact"
              ></Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: { xs: "5", sm: "0", md: "5", lg: "6" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactPage;
