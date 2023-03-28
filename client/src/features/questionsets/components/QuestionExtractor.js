import React, { useState } from "react";
import axios from "axios";

function QuestionExtractor() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  console.log(text);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const transport = axios.create({
      withCredentials: true,
    });

    transport
      .post("http://localhost:8080/extractquestion", formData)
      .then((response) => {
        setText(response.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFileSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Extract Text</button>
      </form>
      {text.length &&
        text.map((question) => {
          return (
            <div
              style={{ padding: "20px", margin: "20px", background: "silver" }}
            >
              {question}
            </div>
          );
        })}
    </div>
  );
}

export default QuestionExtractor;
