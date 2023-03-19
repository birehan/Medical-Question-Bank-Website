import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import HelperText from "../../../components/HelperText";

const CourseSelector = () => {
  const { courses } = useSelector((state) => state.courses);
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(
    courses.filter((course) => {
      return course?.id === parseInt(id);
    })[0]
  );

  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    if (value && value?.id !== id) {
      navigate(`/course/${value?.id}`);
    }
  }, [value]);

  return (
    <Stack sx={{ gap: "20px", width: "100%" }}>
      <HelperText text={"Filter By Course"} />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.title || ""}
        disablePortal
        id="combo-box-demo"
        sx={{ width: "100%" }}
        options={courses}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.title}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CourseSelector;
