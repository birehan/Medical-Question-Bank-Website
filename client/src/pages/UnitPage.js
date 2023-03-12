import React from "react";
import { Stack, Box, Card } from "@mui/material";
import Header from "../components/Header.js";
import UnitContent from "../features/units/components/UnitContent.js";

const UnitPage = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: { xs: "10px", sm: "20px", md: "40px" },
          overflow: "auto",
          flex: 1,
          height: "100%",
        }}
      >
        <Card
          className="course-container"
          sx={{
            border: "1px solid silver",
            width: "500px",
            overflow: "auto",
            margin: "auto",
          }}
        >
          <UnitContent />
        </Card>
      </Box>
    </Stack>
  );
};

export default UnitPage;
