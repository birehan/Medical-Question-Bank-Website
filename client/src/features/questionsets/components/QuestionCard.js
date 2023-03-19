import React, { useState } from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const QuestionCard = ({ question, index, setScore, score }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  console.log(question?.choices, question?.answer);

  const handleChange = (e) => {
    if (selectedValue) {
      return;
    }
    if (e.target.value === question?.answer) {
      setScore(score + 1);
    }
    setSelectedValue(e.target.value);
  };

  return (
    <Box
      className="question-container-card"
      sx={{
        width: {
          xs: "100%",
          md: "80%",
          lg: "70%",
        },
        backgroundColor: "#f6f9fa !important",
        // boxShadow: "0px 0px 30px -20px rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Stack
        sx={{
          padding: "30px 15px 30px 30px",
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
          <Stack sx={{ gap: "10px" }}>
            {question?.choices
              ? JSON.parse(question?.choices).map((choice, index) => {
                  return (
                    <FormControlLabel
                      onClick={() => {
                        if (selectedValue === null) {
                          setSelectedValue(choice?.id);
                        }
                      }}
                      key={index}
                      className={`question-choice
                  
                    `}
                      sx={{
                        p: "7px 15px",
                        //   border: "1px solid silver",
                        borderRadius: "5px",
                        fontFamily: "sans-sarif",
                      }}
                      value={choice?.id}
                      control={
                        <Button
                          sx={{
                            // background: "silver",
                            background:
                              selectedValue !== null &&
                              choice?.id === question.answer
                                ? "green"
                                : selectedValue === choice.id
                                ? "red"
                                : "rgb(234, 234, 234)",
                            mr: "20px",
                            padding: "20px -10px !important",
                            color: "black",
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
                      }
                      label={
                        <Typography
                          sx={{ fontSize: "20px", fontFamily: "sans-sarif" }}
                        >
                          {choice?.value}
                        </Typography>
                      }
                    />
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
