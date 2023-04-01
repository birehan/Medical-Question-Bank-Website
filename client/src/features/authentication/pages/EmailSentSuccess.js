import React from "react";
import { Box, Stack, Button, Card, Typography } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import Email from "../../../assets/email.svg";

const EmailSentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Stack
        sx={{
          borderColor: "#f6f9fa !important",
          margin: "150px 30px 50px",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Card
          sx={{
            //   border: "1px solid silver",
            boxShadow: " 0px 0px 40px -25px rgba(0, 0, 0, 0.5)",
            height: "100%",
            overflow: "auto",
            margin: " 30px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "600px" },
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              margin: "50px 20px",
              width: { xs: "100%", md: "600px" },
            }}
          >
            <Box
              component="img"
              src={Email}
              sx={{
                width: "200px",
                height: "200px",
              }}
            ></Box>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "24px", md: "30px", lg: "30px" },
              }}
            >
              Email Sent!
            </Typography>

            <Button
              onClick={() => navigate("/login")}
              sx={{
                background: "#039198",
                color: "white",
                "&:hover": {
                  background: "#039198",
                  opacity: "0.8",
                },
                padding: "6px 20px",
                alignSelf: "end",
                mr: "30px",
              }}
            >
              Log In
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default EmailSentSuccess;
