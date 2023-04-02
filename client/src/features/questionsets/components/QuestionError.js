import React from "react";
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";

const QuestionError = ({ errors, selectedQuestion, setSelectedQuestion }) => {
  if (!errors || !errors?.questions) {
    return <div></div>;
  }
  let firstIndex = 0;
  for (let i = 0; i < errors?.questions.length; i++) {
    if (errors?.questions[i]) {
      firstIndex = i;
      break;
    }
  }
  setSelectedQuestion(firstIndex);
  const errorQuestion = errors?.questions[firstIndex];

  return (
    <Stack>
      {errorQuestion?.answer && (
        <Typography
          sx={{
            color: "red",
          }}
        >
          Answer is required
        </Typography>
      )}

      {errorQuestion?.choices && (
        <Typography
          sx={{
            color: "red",
          }}
        >
          All choices have to have a value
        </Typography>
      )}
    </Stack>
  );
};

export default QuestionError;
