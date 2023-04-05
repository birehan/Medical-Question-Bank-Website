import React, { useState } from "react";
import { Stack, Typography, Button, Box } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import RightMark from "./RightMark";

const QuestionCard = ({
  question,
  index,
  setScore,
  score,
  setQuestionStates,
  qestionStates,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);

  const handleChange = (id) => {
    if (selectedValue === null) {
      setSelectedValue(id);
    }

    let updated = qestionStates?.map((cur, ind) => {
      if (ind === index) {
        if (cur?.answer === id) {
          return {
            ...cur,
            notDone: false,
            correct: true,
          };
        } else {
          return { ...cur, notDone: false, wrong: true };
        }
      } else {
        return cur;
      }
    });

    setQuestionStates(updated);

    if (id === question?.answer) {
      setScore(score + 1);
    }
  };

  return (
    <Box
      id={`question${index}`}
      className="question-container-card"
      sx={{
        width: {
          xs: "100%",
          md: "85%",
          lg: "85%",
          xl: "70%",
        },
        backgroundColor: "#f6f9fa !important",
        // boxShadow: "0px 0px 30px -20px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Stack
        sx={{
          padding: { xs: "15px 10px 15px 15px", md: "30px 15px 30px 30px" },
          borderRadius: "10px",
        }}
      >
        {/* {openRight ? <RightVideo setOpenRight={setOpenRight} /> : ""} */}
        <Typography
          sx={{
            fontWeight: "bold",
            mb: "10px",
            fontSize: "22px",
            fontFamily: "sans-sarif",
          }}
        >
          {index + 1}. {question?.title}
        </Typography>

        <FormControl>
          <Stack
            sx={{
              gap: "10px",
              width: { xs: "100%", md: "94%" },
              // border: "3px solid green",
            }}
          >
            {question?.choices
              ? JSON.parse(question?.choices).map((choice, index) => {
                  return (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: "0px",
                        padding: "7px 15px",
                        //   border: "1px solid silver",
                        borderRadius: "5px",
                        fontFamily: "sans-sarif",
                        position: "relative",
                        // mr: "35px",
                      }}
                      onClick={() => handleChange(choice?.id)}
                      key={index}
                      className={`question-choice
  
                      `}
                    >
                      <Button
                        sx={{
                          background:
                            selectedValue !== null &&
                            choice?.id === question.answer
                              ? "green"
                              : selectedValue === choice.id
                              ? "red"
                              : "rgb(234, 234, 234)",

                          color:
                            selectedValue !== null &&
                            choice?.id === question.answer
                              ? "white"
                              : selectedValue === choice.id
                              ? "white"
                              : "black",
                          mr: "20px",
                          padding: "8px !important",
                          // color: "black",
                          "&:hover": {
                            background:
                              selectedValue !== null &&
                              choice?.id === question.answer
                                ? "green"
                                : selectedValue === choice.id
                                ? "red"
                                : "rgb(200, 196, 196)",
                          },
                          transition: "400ms all ease-in",
                        }}
                      >
                        {String.fromCharCode(65 + index)}
                      </Button>

                      <Typography
                        sx={{ fontSize: "20px", fontFamily: "sans-sarif" }}
                      >
                        {choice?.value}
                      </Typography>
                      {selectedValue !== null &&
                      showAnimation &&
                      selectedValue === choice?.id ? (
                        <RightMark
                          showAnimation={showAnimation}
                          setShowAnimation={setShowAnimation}
                          isCorrect={selectedValue === question?.answer}
                        />
                      ) : (
                        ""
                      )}
                    </Stack>
                  );
                })
              : ""}
          </Stack>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default QuestionCard;
