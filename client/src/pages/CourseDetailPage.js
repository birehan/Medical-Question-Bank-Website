import React, { useEffect, useState, useMemo } from "react";

import { Stack, Box, Typography } from "@mui/material";
import Header from "../components/Header.js";
import { getQuestionsByCourseId } from "../features/questionsets/actions/questions";
import { useSelector } from "react-redux";

import Search from "../components/Search.js";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import { useParams } from "react-router-dom";
import QuestionsList from "../features/questionsets/components/QuestionsList.js";
import CourseSelector from "../features/courses/components/CourseSelector.js";
import Footer from "../components/Footer.js";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    if (id) {
      dispatch(getQuestionsByCourseId(id));
    }
  }, [id]);

  const { courses, success } = useSelector((state) => state.courses);

  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() =>
    courses.filter(
      (course) =>
        course["title"]?.toLowerCase()?.startsWith(search?.toLowerCase()),
      [search?.toLowerCase()]
    )
  );

  const handleSearch = (text) => {
    setSearch(text);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!courses) {
      dispatch(getCourses());
    }
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(cleanUp());
    }
  }, [success]);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Stack
        // className="questions-container"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          flex: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f6f9fa !important",
            borderColor: "#f6f9fa !important",
            overflow: "auto",
          }}
        >
          <Stack
            className="questions-content"
            sx={{
              margin: "10px 50px 50px",
              overflow: "auto",
              padding: "20px 20px 20px",
              gap: "20px",
              flex: 1,
            }}
          >
            <Search handleSearch={handleSearch} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "2em",
              }}
            >
              Quizzes
            </Typography>
            {questions ? <QuestionsList questions={questions} /> : ""}
          </Stack>
        </Box>

        <Box
          sx={{
            width: { md: "400px", lg: "450px" },
            position: "relative",
            margin: "30px 20px",
          }}
        >
          <Stack
            sx={{
              position: "fixed",
              top: "130px",
              right: "20px",
              width: { md: "360px", lg: "410px" },
            }}
          >
            <Stack
              sx={{
                height: "500px",
                gap: "30px",
                width: "100%",
              }}
            >
              <Typography sx={{ fontSize: "2rem" }}>Filters</Typography>
              <CourseSelector />

              <Stack></Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default CourseDetailPage;
