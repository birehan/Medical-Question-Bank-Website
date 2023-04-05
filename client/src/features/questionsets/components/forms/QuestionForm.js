import React, { useState, useEffect } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import SubjectIcon from "@mui/icons-material/Subject";
import HelperText from "../../../../components/HelperText.js";
import {
  Button,
  Stack,
  Box,
  Typography,
  Input,
  FormHelperText,
} from "@mui/material";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";

import QuestionChoice from "./ChoiceForm.js";
import { useFieldArray } from "react-hook-form";

const QuestionForm = ({
  control,
  register,
  errors,
  selectedQuestion,
  setSelectedQuestion,
  questionLength,
  question,
  getValues,
  setValue,
  watch,
  trigger,
  remove: removeQuestion,
}) => {
  // const [answer, setAnswer] = useState(null);
  // const [choices, setChoices] = useState([{ id: 0, value: "" }]);

  // useEffect(() => {
  // }, [selectedQuestion]);

  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${selectedQuestion}].choices`,
  });
  // console.log(question, fields);

  return (
    <Stack
      sx={{
        flex: 1,
        background: "white",
      }}
    >
      <Stack sx={{ gap: "15px" }}>
        <Box
          sx={{ background: "#039198", padding: "20px", textAlign: "center" }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            Question Form
          </Typography>
        </Box>
        <Stack sx={{ flexDirection: "column", gap: "15px", padding: "40px" }}>
          <Typography>Question {selectedQuestion + 1}</Typography>
          <FormControl variant="standard">
            <Input
              disableUnderline
              //   sx={{ width: "100px" }}
              placeholder="Add Question"
              type="text"
              {...register(`questions.${selectedQuestion}.title`, {
                required: "title is required",
              })}
              // value={getValues(`questions.${selectedQuestion}.title`)}
              // name={`questions[${selectedQuestion}].title`}
              // ref={register()}
              // defaultValue={question?.title}
              variant="outlined"
              id="outlined-basic title"
              sx={{
                background: "#f6f9fa",
                padding: "8px 16px",
                borderRadius: "5px",
              }}
            />
            {errors.questions && errors.questions[selectedQuestion]
              ? !!errors?.questions[selectedQuestion]?.title && (
                  <FormHelperText error id="title-error">
                    {errors?.questions[selectedQuestion]?.title &&
                      errors?.questions[selectedQuestion]?.title.message}
                  </FormHelperText>
                )
              : ""}
          </FormControl>
          <Stack sx={{ gap: "15px" }}>
            {fields.map((choice, index) => {
              return (
                <QuestionChoice
                  key={choice?.id}
                  choice={choice}
                  index={index}
                  remove={remove}
                  append={append}
                  selectedQuestion={selectedQuestion}
                  register={register}
                  errors={errors}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  question={question}
                  trigger={trigger}
                  control={control}
                />
              );
            })}
          </Stack>
          <Stack sx={{ gap: "20px" }}>
            <HelperText text="Explanation" />
            <FormControl variant="standard">
              <Input
                multiline
                // maxRows={6}
                minRows={6}
                disableUnderline
                //   sx={{ width: "100px" }}
                placeholder="Explanation"
                type="text"
                {...register(`questions.${selectedQuestion}.explanation`, {
                  required: "explanation is required",
                })}
                variant="outlined"
                id="outlined-basic description"
                sx={{
                  background: "#f6f9fa",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  alignItems: "flex-start",
                }}
              />
              {errors.questions && errors.questions[selectedQuestion]
                ? !!errors?.questions[selectedQuestion]?.explanation && (
                    <FormHelperText error id="explanation-error">
                      {errors?.questions[selectedQuestion]?.explanation &&
                        errors?.questions[selectedQuestion]?.explanation
                          .message}
                    </FormHelperText>
                  )
                : ""}
            </FormControl>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button
            onClick={() => {
              if (questionLength > 1) {
                removeQuestion(selectedQuestion);
                if (selectedQuestion != 0) {
                  setSelectedQuestion(selectedQuestion - 1);
                }
              }
            }}
            sx={{
              background: "#f6f9fa",

              color: "#078989",
              fontWeight: "bold",
              margin: "30px auto",
              "&:hover": {
                background: "#f6f9fa",

                transition: "400ms all easy-in",
              },
              display: "flex",
              padding: "8px 20px !important",
              border: "1px solid silver",
            }}
          >
            Remove
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default QuestionForm;
