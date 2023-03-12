import React from "react";
import { FormHelperText } from "@mui/material";
const HelperText = ({ text }) => {
  return (
    <FormHelperText
      sx={{
        mb: "-15px",
        fontSize: "16px",
        color: "#20839e",
        opacity: "1",
        fontWeight: "bold",
      }}
    >
      {text}
    </FormHelperText>
  );
};

export default HelperText;
