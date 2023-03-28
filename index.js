const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const pdfParser = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");

var cors = require("cors");

// configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());

app.use(cors({ origin: true, credentials: true }));

// define file upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  // check if file is a PDF, DOCX, or TXT
  if (file.mimetype === "application/pdf") {
    // extract text from PDF
    pdfParser(file.buffer)
      .then((data) => {
        res.json({ text: data.text });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error extracting text from PDF" });
      });
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // extract text from DOCX
    mammoth
      .extractRawText({ buffer: file.buffer })
      .then((result) => {
        const text = result.value.trim();
        res.json({ text: text });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error extracting text from DOCX" });
      });
  } else if (file.mimetype === "text/plain") {
    // extract text from TXT
    const text = file.buffer.toString("utf8").trim();

    // const questions = text.split(/\d+\.\s/).filter((q) => q);

    const questions = text.split(/\d+\.\s+/).slice(1);

    for (let i = 0; i < questions.length; i++) {
      questions[i] = i + 1 + ". " + questions[i];
    }

    res.json({ text: questions });
  } else {
    res.status(400).json({ message: "File must be a PDF, DOCX, or TXT" });
  }
});

// start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
