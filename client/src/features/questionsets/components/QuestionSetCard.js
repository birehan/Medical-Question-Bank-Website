import React from "react";
import { Card } from "@mui/material";

const QuestionSetCard = ({ questionSet }) => {
  return (
    <Card sx={{ width: "200px", height: "200px" }}>{questionSet?.title}</Card>
  );
};

export default QuestionSetCard;
