import React, { useState, useEffect } from "react";
import QuestionSetCard from "./QuestionSetCard";
import { Stack, Box, Typography, Pagination } from "@mui/material";
import Loader from "../../../components/Loader";

const QuestionsList = ({ questions, course }) => {
  const [curPage, setCurPage] = useState(1);
  const [lengthChange, setLengthChange] = useState(questions?.length);
  const exercisePerPage = 9;

  const lastIndex = curPage * exercisePerPage;
  const firstIndex = lastIndex - exercisePerPage;
  const curExercises = questions?.slice(firstIndex, lastIndex);

  const paginate = (event, value) => {
    setCurPage(value);
    window.scrollTo({ top: 0 });
  };
  useEffect(() => {
    if (questions?.length != lengthChange) {
      setCurPage(1);
    }
    setLengthChange(questions?.length);
  }, [lengthChange, questions]);

  if (!questions) {
    return <Loader />;
  }

  return (
    <Stack
      className="quiz-container"
      sx={{
        // flex: 1,

        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: { xs: "20px", lg: "40px" },
          justifyContent: "center",
        }}
      >
        {curExercises && curExercises.length ? (
          curExercises.map((questionSet, index) => {
            return <QuestionSetCard questionSet={questionSet} key={index} />;
          })
        ) : (
          <Box
            className="no-course"
            sx={{ alignSelf: "center", margin: "auto" }}
          >
            {" "}
            <Typography sx={{ textAlign: "center" }}>No Quiz Found!</Typography>
          </Box>
        )}
      </Stack>

      <Stack sx={{ margin: "50px auto 0px", alignItems: "center" }}>
        {questions?.length > 9 && (
          <Pagination
            sx={{
              color: "#078989",
              //   border: "5px solid green",
              ul: {
                color: "red",
              },
              ".css-yx0nvq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected ":
                {
                  background: "white !important",
                  color: "#078989",

                  borderRadius: "50% !important",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                },
              ".css-n8417t-MuiSvgIcon-root-MuiPaginationItem-icon": {
                color: "#078989",
                fontSize: "2rem",
              },
              zIndex: "10",
            }}
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(questions.length / exercisePerPage)}
            page={curPage}
            size="large"
            onChange={paginate}
          ></Pagination>
        )}
      </Stack>
    </Stack>
  );
};

export default QuestionsList;
