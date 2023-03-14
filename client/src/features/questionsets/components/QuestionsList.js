import React from "react";
import QuestionSetCard from "./QuestionSetCard";
import { Stack } from "@mui/material";

const QuestionsList = ({ questions }) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      {questions.map((questionSet, index) => {
        return <QuestionSetCard questionSet={questionSet} key={index} />;
      })}
    </Stack>
  );
};

export default QuestionsList;
