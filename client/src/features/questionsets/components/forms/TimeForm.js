import React from "react";

import { Stack, Typography, Input } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const TimeForm = ({ register, errors }) => {
  return (
    <Stack sx={{ gap: "15px" }}>
      <Typography sx={{ fontSize: "0.9rem", fontFamily: "Poppins" }}>
        The duration of the exam
      </Typography>
      <Stack sx={{ flexDirection: "row", gap: "30px" }}>
        <FormControl variant="standard">
          <Input
            disableUnderline
            //   sx={{ width: "100px" }}
            placeholder="0"
            type="tel"
            {...register("duration.hour", {
              required: "duration hour is required",
            })}
            error={Boolean(errors?.duration?.hour)}
            value={register?.duration?.hour}
            variant="outlined"
            id="outlined-basic hour"
            endAdornment={<InputAdornment position="end">Hrs</InputAdornment>}
            sx={{
              background: "#f6f9fa",
              padding: "3px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <Input
            disableUnderline
            //   sx={{ width: "100px" }}
            placeholder="0"
            type="tel"
            {...register("duration.minute", {
              required: "minute is required",
            })}
            error={Boolean(errors?.duration?.minute)}
            value={register?.duration?.minute}
            variant="outlined"
            id="outlined-basic minute"
            endAdornment={<InputAdornment position="end">Min</InputAdornment>}
            sx={{
              background: "#f6f9fa",
              padding: "3px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <Input
            disableUnderline
            //   sx={{ width: "100px" }}
            placeholder="0"
            type="number"
            {...register("duration.second", {
              required: "second is required",
            })}
            error={Boolean(errors?.duration?.second)}
            value={register?.duration?.second}
            variant="outlined"
            id="outlined-basic second"
            endAdornment={<InputAdornment position="end">Sec</InputAdornment>}
            sx={{
              background: "#f6f9fa",
              padding: "3px 15px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default TimeForm;
