import React, { useState } from "react";
import axios from "axios";

import { Stack, Button } from "@mui/material";

function QuestionExtractor({ setValue }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  console.log(text);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);

    const transport = axios.create({
      withCredentials: true,
    });

    transport
      .post("http://localhost:8080/extractquestion", formData)
      .then((response) => {
        setText(response.data);
        setValue("questions", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack>
      <Stack sx={{ gap: "20px" }}>
        <input type="file" onChange={handleFileUpload} />
        <Button
          onClick={() => {
            console.log("file: ", file);
            if (file) {
              console.log("file: ", true);

              handleFileSubmit();
            }
          }}
          sx={{
            background: "#0EAFAF",
            color: "white",
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 700,
            textTransform: "capitalize",
            "&:hover": {
              background: "#0EAFAF",
              opacity: "0.8",
              color: "white",
            },
          }}
        >
          Upload Questions
        </Button>
      </Stack>
    </Stack>
  );
}

export default QuestionExtractor;
