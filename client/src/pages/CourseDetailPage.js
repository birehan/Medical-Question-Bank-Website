import React, { useEffect, useState, useMemo } from "react";

import {
  Stack,
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../components/Header.js";
import { getQuestionsByCourseId } from "../features/questionsets/actions/questions";
import { useSelector } from "react-redux";

import Search from "../components/Search.js";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import { useParams } from "react-router-dom";
import QuestionsList from "../features/questionsets/components/QuestionsList.js";
import Footer from "../components/Footer.js";
import UnitFilter from "../features/units/components/UnitFilter.js";
import { getUnits } from "../features/units/actions/units.js";

import UnitFilterDropDown from "../features/questionsets/components/UnitFilterDropDown.js";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { questions } = useSelector((state) => state.questions);
  const { units } = useSelector((state) => state.courseDetail);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    if (id) {
      dispatch(getQuestionsByCourseId(id));
      dispatch(getUnits(id));
    }
  }, [id]);

  const { courses, success } = useSelector((state) => state.courses);

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
        backgroundColor: "#f6f9fa !important",
      }}
    >
      <Header />
      <Stack
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          flex: 1,
          mt: "100px",
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
                  units={units}
                />
              ) : (
                ""
              )}
            </Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "2em",
              }}
            >
              Quizzes
            </Typography>
            {filteredQuestions ? (
              <QuestionsList questions={filteredQuestions} />
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
                units={units}
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
