import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

const TimeCounter = ({ duration }) => {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 30,
  });
  const [counter, setCounter] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (duration) {
      setTimeLeft(
        JSON.parse(duration)["hour"] * 3600 +
          JSON.parse(duration)["minute"] * 60 +
          JSON.parse(duration)["second"] -
          counter
      );
    }
  }, [duration]);

  var distance = timeLeft;
  var hours = Math.floor(distance / 3600);
  var minutes = Math.floor((distance - hours * 3600) / 60);
  var seconds = Math.floor(distance - hours * 3600 - minutes * 60);

  const demo = document.getElementById("demo");
  if (demo) {
    demo.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
  }

  return (
    <Stack sx={{ padding: { xs: "30px 0 0 20px", lg: "20px 0 0 20px" } }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", opacity: "0.6", mb: "10px" }}
      >
        Time Remaining
      </Typography>
      <Typography> The duation of the exam</Typography>
      <Stack sx={{ flexDirection: "row", gap: "20px", mt: "10px" }}>
        <Box
          sx={{
            backgroundColor: "#f6f9fa !important",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          {hours} Hrs
        </Box>
        <Box
          sx={{
            backgroundColor: "#f6f9fa !important",
            padding: "10px 20px",

            borderRadius: "5px",
          }}
        >
          {minutes} Min
        </Box>
        <Box
          sx={{
            backgroundColor: "#f6f9fa !important",
            padding: "10px 20px",

            borderRadius: "5px",
          }}
        >
          {seconds} Sec
        </Box>
      </Stack>
    </Stack>
  );
};

export default TimeCounter;
