import React from "react";

import { Stack, Box, Typography, Avatar, Divider, Button } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const QuizSetNumber = ({ qestionStates }) => {
  return (
    <Stack
      sx={{
        gap: "20px",
        // border: "3px solid green",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Stack
        sx={{
          gap: "20px",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: "rgb(234, 234, 234)",
                width: "15px",
              }}
            />
            <Typography>Not Seen</Typography>
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              gap: "5px",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                color: "black",
                width: "15px",
              }}
            />
            <Typography>Attempted</Typography>
          </Stack>
        </Stack>

        <Divider />

        {qestionStates ? (
          <Stack
            sx={{
              flexDirection: "row",
              gap: "15px",
              flexWrap: "wrap",
              width: "100%",
              margin: "auto",
            }}
          >
            {qestionStates?.map((question, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  // onClick={() => setSelectedQuestion(index)}
                >
                  {/* <a href={`#question${index}`}> */}
                  <Avatar
                    onClick={() => {
                      const target = document.getElementById(
                        `question${index}`
                      );
                      target.scrollIntoView({ block: "center" });
                      // target.scrollTop("300px");
                      // target.scrollTo({
                      //   top: 1000,
                      //   behavior: "smooth",
                      // });
                    }}
                    sx={{
                      width: "40px",
                      height: "40px",
                      fontSize: "15px",
                      background: "rgb(234, 234, 234)",
                      color: "black",
                      // background: question?.correct
                      //   ? "green"
                      //   : question?.wrong
                      //   ? "red"
                      //   : "#f6f9fa",
                      color: question?.notDone ? "black" : "white",
                      background: question?.notDone ? "#f6f9fa" : "black",
                      "&:hover": {
                        cursor: "pointer",
                        background: question?.notDone
                          ? "rgb(200, 196, 196)"
                          : "black",

                        // background: question?.correct
                        //   ? "green"
                        //   : question?.wrong
                        //   ? "red"
                        //   : "rgb(200, 196, 196)",
                      },
                    }}
                  >
                    {index + 1}
                  </Avatar>
                  {/* </a> */}
                </Box>
              );
            })}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default QuizSetNumber;
