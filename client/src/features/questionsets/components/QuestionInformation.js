import React from "react";
import { Stack, Box, Card, Typography, Button } from "@mui/material";
import TimeForm from "./forms/TimeForm";
import QuestionInfoForm from "./forms/QuestionInfoForm";

const QuestionInformation = ({ register, errors }) => {
  return (
    <Stack
      className="content-container"
      sx={{
        margin: "30px 10px 30px 30px",
        // overflow: "auto",
        // border: "4px solid green",
        padding: "0 20px 0 0",
        gap: "30px",
      }}
    >
      {/* <TimeForm /> */}
      <QuestionInfoForm register={register} errors={errors} />
    </Stack>
  );
};

export default QuestionInformation;
