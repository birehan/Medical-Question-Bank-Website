import React, { useEffect, useState, useMemo } from "react";

import { Stack, Box, Typography } from "@mui/material";
import Header from "../components/Header.js";
import { getQuestionsByCourseId } from "../features/questionsets/actions/questions";
import { useSelector } from "react-redux";

import Search from "../components/Search.js";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import { useParams, useLocation } from "react-router-dom";
import QuestionsList from "../features/questionsets/components/QuestionsList.js";
import CourseSelector from "../features/courses/components/CourseSelector.js";
import Footer from "../components/Footer.js";
import UnitFilter from "../features/units/components/UnitFilter.js";
import { getUnits } from "../features/units/actions/units.js";
import { getQuestionsById } from "../features/questionsets/actions/questions.js";
import QuestionCard from "../features/questionsets/components/QuestionCard.js";
import TimeCounter from "../features/questionsets/components/TimeCounter.js";

const QuizPage = () => {
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const { state } = useLocation();
  const { questions } = useSelector((state) => state.questions);
  const { questionSets } = useSelector((state) => state.courseDetail);
  const [unitFilter, setUnitFilter] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsById(id));
  }, []);

  const { courses, success } = useSelector((state) => state.courses);

  const [search, setSearch] = useState("");

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
        height: "fit-content",
        width: "100vw",
        backgroundColor: "#f6f9fa !important",
        width: "100%",
      }}
    >
      <Header />
      <Stack
        // className="questions-container"
        sx={{
          flexDirection: { xs: "column", md: "column", lg: "row" },
          flex: 1,
          width: { xs: "90%", md: "90%", lg: "90%" },
          margin: "auto",
          gap: "50px",
          mt: "102px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <Stack
            className="questions-content"
            sx={{
              margin: { xs: "50px 0px 10px", lg: "50px 0px" },
              overflow: "auto",
              gap: "20px",
              //   flex: 1,
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                height: "60px",
                background: "white",
                padding: "10px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <Typography>{state?.questionSet?.title}</Typography>
            </Box>

            <Stack
              sx={{
                flex: 1,
                background: "white",
                padding: "50px 30px",
                borderRadius: "10px",
                height: 1,
              }}
            >
              {questionSets && questionSets?.length ? (
                <Stack
                  sx={{
                    gap: "50px",
                    justifyContent: "center",
                    alignItems: "center",

                    // border: "10px solid green",
                  }}
                >
                  {questionSets.map((question, index) => {
                    return (
                      <QuestionCard
                        key={index}
                        question={question}
                        index={index}
                        setScore={setScore}
                        score={score}
                      />
                    );
                  })}
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", lg: "400px" },
            position: "relative",
          }}
        >
          <Stack
            sx={{
              position: { xs: "relative", md: "relative", lg: "fixed" },
              top: { xs: "0", lg: "150px" },
              // right: "20px",
              width: { xs: "100%", lg: "400px" },
              height: { xs: "fit-content", lg: "80%" },
              margin: "0px auto 50px",
            }}
          >
            <Stack
              sx={{
                gap: "30px",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "220px",
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <TimeCounter duration={state?.questionSet?.duration} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  background: "white",
                  padding: "20px",

                  borderRadius: "10px",
                }}
              >
                part 2
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default QuizPage;
