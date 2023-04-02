import React, { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";

const TimeCounter = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (duration) {
      const hour = JSON.parse(duration)["hour"] * 3600;
      const minute = JSON.parse(duration)["minute"] * 60;
      const second = JSON.parse(duration)["second"];

      setTimeLeft(parseInt(hour) + parseInt(minute) + parseInt(second));
    }
  }, [duration]);
  var hours = Math.floor(timeLeft / 3600);
  var minutes = Math.floor((timeLeft - hours * 3600) / 60);
  var seconds = Math.floor(timeLeft - hours * 3600 - minutes * 60);

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
