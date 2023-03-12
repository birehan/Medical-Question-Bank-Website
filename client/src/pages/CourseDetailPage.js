import React, { useEffect, useState, useMemo } from "react";

import { Stack, Box, Card, Typography } from "@mui/material";
import Header from "../components/Header.js";
import { getQuestionsByCourseId } from "../features/questionsets/actions/questions";
import { useSelector } from "react-redux";

import Search from "../components/Search.js";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import CourseCard from "../features/courses/components/CourseCard";
import { useParams } from "react-router-dom";
import QuestionSetCard from "../features/questionsets/components/QuestionSetCard.js";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { questions } = useSelector((state) => state.questions);

  console.log("questions: ", questions);

  useEffect(() => {
    console.log("Id", id);
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
    <Stack>
      <Header />
      <Stack
        className="questions-container"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: "30px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f6f9fa !important",
            borderColor: "#f6f9fa !important",
          }}
        >
          <Stack
            className="questions-content"
            sx={{
              margin: "50px",
              overflow: "auto",
              padding: "20px 20px 20px",
              gap: "20px",
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
              Courses
            </Typography>
            {questions ? (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "40px",
                }}
              >
                {questions.map((questionSet, index) => {
                  return (
                    <QuestionSetCard questionSet={questionSet} key={index} />
                  );
                })}
              </Stack>
            ) : (
              ""
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            width: { md: "400px", lg: "500px" },
            position: "relative",
          }}
        >
          <Stack
            sx={{
              position: "fixed",
              top: "100px",
              right: "0px",
              width: { md: "400px", lg: "500px" },
            }}
          >
            <Box
              sx={{
                height: "500px",
                // border: "4px solid green",
                margin: "30px",
                padding: "20px",
              }}
            >
              <Typography sx={{ fontSize: "2rem" }}>Filters</Typography>
              
              <Stack></Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CourseDetailPage;
