import React from "react";
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QuestionError from "../QuestionError";

import QuestionExtractor from "../QuestionExtractor";

const QuestionsSections = ({
  fields,
  append,
  prepend,
  remove,
  register,
  errors,
  selectedQuestion,
  setSelectedQuestion,
  setValue
}) => {
  return (
    <Stack sx={{ padding: "20px", gap: "20px" }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "24px" }}
        >
          Questions
        </Typography>
        <Avatar
          alt="Add Question"
          sx={{
            bgcolor: "#039198",
            width: "30px",
            height: "30px",
            "&:hover": { cursor: "pointer" },
          }}
          onClick={() => {
            append({
              title: "",
              choices: [{ id: 0, value: "" }],
              answer: "",
              explanation: "No explanation",
            });
          }}
        >
          <AddIcon />
        </Avatar>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          gap: "15px",
          flexWrap: "wrap",
          width: "80%",
          margin: "auto",
        }}
      >
        {fields.map((field, index) => {
          return (
            <Box
              key={index}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => setSelectedQuestion(index)}
            >
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  fontSize: "15px",
                  background:
                    selectedQuestion === index ? "#039198" : "#f6f9fa",
                  color: selectedQuestion === index ? "#f6f9fa" : "#039198",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {index + 1}
              </Avatar>
            </Box>
          );
        })}
      </Stack>

      <Button
        onClick={() => {}}
        sx={{
          width: "100%",
          // background: "#26acd1",
          background: "#0EAFAF",

          color: "white",
          fontWeight: "bold",
          m: "20px auto 0",
          fontSize: "1.05rem",
          "&:hover": {
            background: "#078989",
            transition: "400ms all easy-in",
          },
          display: "flex",
          padding: "8px 20px !important",
        }}
        type="submit"
      >
        Save
      </Button>

      <QuestionError
        errors={errors}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
      />

      <QuestionExtractor setValue={setValue} />
    </Stack>
  );
};

export default QuestionsSections;
