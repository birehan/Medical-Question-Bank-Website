import React, { useState } from "react";

import { Button, Stack, Input } from "@mui/material";

import FormControl from "@mui/material/FormControl";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";

const QuestionChoice = ({
  choice,
  index,
  remove,
  append,
  selectedQuestion,
  register,
  errors,
  getValues,
  setValue,
  watch,
}) => {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        gap: "10px",
        width: "100% !important",
      }}
    >
      {index + 1 < getValues(`questions.${selectedQuestion}.choices.length`) ? (
        <Button
          onClick={() => {
            if (watch(`questions.${selectedQuestion}.answer`) === choice?.id) {
              setValue(`questions.${selectedQuestion}.answer`, "");
            }
            remove(index);
          }}
          sx={{ width: "20px", background: "#f6f9fa", color: "black" }}
        >
          <RemoveIcon />
        </Button>
      ) : (
        <Button
          onClick={() => {
            if (
              getValues(`questions.${selectedQuestion}.choices.${index}.value`)
            ) {
              append({ id: index + 1, value: "" });
            }
          }}
          sx={{ width: "20px", background: "#f6f9fa", color: "black" }}
        >
          <AddIcon />
        </Button>
      )}
      <FormControl sx={{ width: "100%" }} variant="standard">
        <Input
          disableUnderline
          fullWidth
          type="text"
          {...register(
            `questions[${selectedQuestion}].choices[${index}].value`,
            {
              required: "title is required",
            }
          )}
          variant="outlined"
          id="outlined-basic title"
          sx={{
            background: "#f6f9fa",
            padding: "8px 16px",
            borderRadius: "5px",
          }}
        />
      </FormControl>
      <Button
        onClick={() => {
          setValue(`questions.${selectedQuestion}.answer`, choice?.id);
          setValue(
            `questions.${selectedQuestion}.choices.${index}.id`,
            choice?.id
          );
        }}
        sx={{
          width: "20px",
          background:
            watch(`questions.${selectedQuestion}.answer`) === choice?.id
              ? "#078989"
              : "#f6f9fa",
          color:
            watch(`questions.${selectedQuestion}.answer`) === choice?.id
              ? "white"
              : "black",
          "&:hover": {
            background:
              watch(`questions.${selectedQuestion}.answer`) === choice?.id
                ? "#078989"
                : "#f6f9fa",
          },
        }}
      >
        <DoneIcon />
      </Button>
    </Stack>
  );
};
export default QuestionChoice;
