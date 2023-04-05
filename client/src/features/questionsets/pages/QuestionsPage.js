import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "../../../components/Header";
import QuestionInformation from "../components/QuestionInformation";
import QuestionForm from "../components/forms/QuestionForm";
import QuestionsSections from "../components/forms/QuestionsSections";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createQuestions,
  cleanUpQuesions,
  getQuestionsById,
  updateQuestions,
} from "../actions/questions.js";
import ToastAlert from "../../../components/ToastAlert";
import { useFieldArray, useForm } from "react-hook-form";
import { validateQuestion } from "../components/ValidateQuestion";
import { useLocation } from "react-router-dom";

const QuestionsPage = () => {
  const location = useLocation();
  const { state } = useLocation();
  const [questionsList, setQuestionsList] = useState([]);

  const { questionSets } = useSelector((state) => state.courseDetail);

  useEffect(() => {
    if (state?.questionSet) {
      dispatch(getQuestionsById(state?.questionSet?.id));
    }
  }, [state?.questionSet]);

  useEffect(() => {
    if (questionSets) {
      let array = [];
      for (let i = 0; i < questionSets.length; i++) {
        const cur = {
          ...questionSets[i],
          choices: JSON.parse(questionSets[i].choices),
        };
        array.push(cur);
      }
      setQuestionsList(array);
    }
  }, [questionSets]);

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const { message, success } = useSelector((state) => state.questions);
  const [openToast, setOpenToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success && (message == "created" || message === "updated")) {
      setOpenToast(true);
      dispatch(cleanUpQuesions());
    }
  }, [success]);

  useEffect(() => {
    dispatch(cleanUpQuesions());
  }, [location, dispatch]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    setError,
    trigger,
  } = useForm({
    defaultValues: {
      id: state?.questionSet?.id || 0,
      title: state?.questionSet?.title || "",
      description: state?.questionSet?.description || "",
      unitId: state?.questionSet?.unitId || "",
      courseId: state?.questionSet?.courseId || "",

      questions: [
        {
          title: "",
          choices: [{ id: 0, value: "" }],
          answer: "",
          explanation: "No explanation",
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

  useEffect(() => {
    if (questionsList.length > 0 && state?.questionSet) {
      let array = [];
      for (let i = 0; i < questionSets.length; i++) {
        const cur = {
          ...questionSets[i],
          choices: JSON.parse(questionSets[i].choices),
        };
        array.push(cur);
      }
      setValue("questions", array);
    }
    if (state?.questionSet) {
      const { hour, minute, second } = JSON.parse(state?.questionSet?.duration);
      setValue("duration.hour", parseInt(hour));
      setValue("duration.minute", parseInt(minute));
      setValue("duration.second", parseInt(second));
    }
  }, [questionSets]);

  // const onSubmit = (data) => {
  //   console.log("data: ", data);
  //   dispatch(createQuestions(data));
  // };
  const onSubmit = (data) => {
    let isValid = true;
    data.questions.forEach((question, index) => {
      const errors = validateQuestion(question); // replace with your own validation function
      if (errors) {
        isValid = false;
        errors.forEach((error) => {
          setError(`questions[${index}].${error.field}`, {
            type: error.type,
            message: error.message,
          });
        });
      }
    });

    if (isValid) {
      console.log(data);
      // Submit the form
      if (!state?.questionSet) {
        dispatch(createQuestions(data));
      } else {
        dispatch(updateQuestions(data));
      }
    }
  };

  return (
    <Stack
      sx={{
        background: "#f6f9fa",
      }}
    >
      {openToast && (
        <ToastAlert
          openToast={openToast}
          setOpenToast={setOpenToast}
          message={`Question set ${message} successfully`}
        />
      )}
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className="questions-container"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            gap: "10px",
            background: "#f6f9fa",
            margin: "80px auto 0",
            // border: "3px solid green",
            width: {
              xs: "95%",
              sm: "90%",
              md: "80%",
              lg: "100%",
            },
          }}
        >
          <Box sx={{ flex: 1, flexWrap: "wrap" }}>
            <QuestionInformation
              watch={watch}
              register={register}
              errors={errors}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: { xs: "30px 0", lg: "30px 10px" },
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
                setSelectedQuestion={setSelectedQuestion}
                question={fields[selectedQuestion]}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                trigger={trigger}
                remove={remove}
                questionLength={fields.length}
              />
            </Stack>
          </Box>
          <Box sx={{ flex: 1 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: { xs: "0px 0 20px", lg: "30px 30px 10px" },

                overflow: "auto",
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
                setValue={setValue}
              />
            </Stack>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default QuestionsPage;
