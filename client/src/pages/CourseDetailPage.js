import React, { useEffect, useState, useMemo } from "react";

import { Stack, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "../components/Header.js";
import { getQuestionsByCourseId } from "../features/questionsets/actions/questions";
import { useSelector } from "react-redux";

import Search from "../components/Search.js";
import { useDispatch } from "react-redux";
import { getCourseById, cleanUp } from "../features/courses/actions/courses";
import { useParams } from "react-router-dom";
import QuestionsList from "../features/questionsets/components/QuestionsList.js";
import Footer from "../components/Footer.js";
import UnitFilter from "../features/units/components/UnitFilter.js";
import { getUnits } from "../features/units/actions/units.js";

import UnitFilterDropDown from "../features/questionsets/components/UnitFilterDropDown.js";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { questions } = useSelector((state) => state.questions);
  const { courses, success, units } = useSelector((state) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseUnits, setCourseUnits] = useState([]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    if (id) {
      dispatch(getQuestionsByCourseId(id));
      if (courses) {
        const course = courses.filter(
          (course) => parseInt(course?.id) === parseInt(id)
        );
        if (course) {
          setSelectedCourse(course[0]);
        }
      }
      if (units) {
        setCourseUnits(
          units.filter((unit) => parseInt(unit?.courseId) === parseInt(id))
        );
      }
    }
  }, [id]);

  // const { courses, success } = useSelector((state) => state.courses);

  const [search, setSearch] = useState("");
  const [filterUnit, setfilterUnit] = useState("");

  const filteredQuestions = useMemo(() => {
    if (!questions) return [];

    return questions?.filter((question) => {
      const searchMatches =
        question?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
        question?.description?.toLowerCase()?.includes(search?.toLowerCase());

      let filterMatches = [];

      if (filterUnit) {
        filterMatches = question?.unitId === parseInt(filterUnit);
      }

      return searchMatches && filterMatches;
    });
  }, [questions, search, filterUnit]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(cleanUp());
    }
  }, [success]);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f6f9fa !important",
        width: "100vw",
      }}
    >
      <Header />
      <Stack
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          flex: 1,
          mt: "100px",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderColor: "#f6f9fa !important",
            overflow: "auto",
          }}
        >
          <Stack
            className="questions-content"
            sx={{
              margin: {
                xs: "20px",
                lg: "10px 50px 50px",
              },
              overflow: "auto",
              padding: "20px 20px 20px",
              gap: "20px",
              flex: 1,
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Search
                handleSearch={handleSearch}
                helperText="Search a question set"
              />

              {isMatch ? (
                <UnitFilterDropDown
                  filterUnit={filterUnit}
                  setfilterUnit={setfilterUnit}
                  units={courseUnits}
                />
              ) : (
                ""
              )}
            </Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.8rem", md: "2rem" },
                margin: "10px 0px 20px",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              {selectedCourse?.title} Quizzes
            </Typography>
            {filteredQuestions ? (
              <QuestionsList
                course={selectedCourse}
                units={courseUnits}
                questions={filteredQuestions}
              />
            ) : (
              ""
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            width: { md: "350px", lg: "400px" },
            position: "relative",
            background: "white",
            padding: { xs: "0", lg: "30px 50px 20px 50px" },
            mt: { xs: "0", lg: "-20px" },
          }}
        >
          <Stack
            sx={{
              position: { xs: "relative", lg: "fixed" },
              top: { xs: "0", lg: "130px" },
              width: { md: "350px", lg: "400px" },
            }}
          >
            {isMatch ? (
              ""
            ) : (
              <UnitFilter
                filterUnit={filterUnit}
                setfilterUnit={setfilterUnit}
                units={courseUnits}
              />
            )}
          </Stack>
        </Box>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default CourseDetailPage;
