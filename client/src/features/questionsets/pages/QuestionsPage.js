import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "../../../components/Header";
import QuestionInformation from "../components/QuestionInformation";
import QuestionForm from "../components/forms/QuestionForm";
import QuestionsSections from "../components/forms/QuestionsSections";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createQuestions } from "../actions/questions.js";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";

const QuestionsPage = () => {
  const { message } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      questions: [
        {
          title: "",
          choices: [{ id: 0, value: "" }],
          answer: "",
          explanation: "",
        },
      ],

      duration: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    },
  });
  const { fields, append, prepend, remove } = useFieldArray({
    name: "questions",
    control,
  });
  console.log("errors:");

  const onSubmit = (data) => {
    console.log("data: ", data);
    dispatch(createQuestions(data));
  };

  return (
    <Stack>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className="questions-container"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: "10px",
            background: "#f6f9fa",
            mt: "100px",
          }}
        >
          <Box sx={{ flex: 1, flexWrap: "wrap" }}>
            <QuestionInformation register={register} errors={errors} />
          </Box>
          <Box sx={{ flex: 2 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: { xs: "30px", md: "30px 10px" },
                overflow: "auto",
                gap: "20px",
                background: "white",
                borderRadius: "10px !important",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              <QuestionForm
                key={fields[selectedQuestion]?.id}
                register={register}
                errors={errors}
                control={control}
                selectedQuestion={selectedQuestion}
                question={fields[selectedQuestion]}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
              />
            </Stack>
          </Box>
          <Box sx={{ flex: 1 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: "30px 30px 10px",

                overflow: "auto",
                // border: "1px solid green",
                gap: "20px",
                borderRadius: "10px !important",
                background: "white",
              }}
            >
              <QuestionsSections
                fields={fields}
                append={append}
                prepend={prepend}
                remove={remove}
                register={register}
                setSelectedQuestion={setSelectedQuestion}
                selectedQuestion={selectedQuestion}
                errors={errors}
              />
            </Stack>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default QuestionsPage;
