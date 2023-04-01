import React, { useEffect, useState } from "react";

import { Stack, Box, Typography } from "@mui/material";
import Header from "../components/Header.js";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import { getQuestionsById } from "../features/questionsets/actions/questions.js";
import QuestionCard from "../features/questionsets/components/QuestionCard.js";
import TimeCounter from "../features/questionsets/components/TimeCounter.js";
import QuizSetNumber from "../features/questionsets/components/QuizSetNumber.js";

import DoneDialog from "../features/questionsets/components/DoneDialog.js";
const QuizPage = () => {
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const { state } = useLocation();
  const { questionSets } = useSelector((state) => state.courseDetail);
  const [qestionStates, setQuestionStates] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    let states = [];

    for (let i = 0; i < questionSets.length; i++) {
      states.push({
        ...questionSets[i],
        notDone: true,
        correct: false,
        wrong: false,
      });
    }
    setQuestionStates(states);
  }, [questionSets]);

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        height: "fit-content",
        width: "100vw",
        backgroundColor: "#f6f9fa !important",
      }}
    >
      <Header />
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "column", lg: "row" },
          flex: 1,
          width: { xs: "95%", sm: "95%", md: "90%" },
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
            }}
          >
            <Stack
              sx={{
                height: "60px",
                background: "white",
                padding: "10px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "10px",
                flexDirection: "row",
              }}
            >
              <Typography>{state?.questionSet?.title}</Typography>

              <DoneDialog qestionStates={qestionStates} />
            </Stack>

            <Stack
              sx={{
                flex: 1,
                background: "white",
                padding: { xs: "30px 15px", md: "50px 10px" },
                borderRadius: "10px",
                height: 1,
              }}
            >
              {questionSets && questionSets?.length ? (
                <Stack
                  sx={{
                    gap: { xs: "30px", md: "50px" },
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
                        qestionStates={qestionStates}
                        setQuestionStates={setQuestionStates}
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
                <QuizSetNumber qestionStates={qestionStates} />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default QuizPage;
