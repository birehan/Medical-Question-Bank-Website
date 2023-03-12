import React from "react";
import { Stack, Box, Card } from "@mui/material";
import CourseForm from "../features/courses/components/CourseForm";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.js";

const CoursePage = () => {
  const { state } = useLocation();
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
          <CourseForm course={state?.course} />
        </Card>
      </Box>
    </Stack>
  );
};

export default CoursePage;
