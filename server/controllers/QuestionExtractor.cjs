const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

// const extractQuestionsText = (text) => {
//   // Remove empty lines from the text
//   text = text.replace(/^\s*\n/gm, "");

//   const questions = [];

//   // Split the text into an array of lines
//   const lines = text.split("\n");

//   // Initialize variables to keep track of the current question
//   let currentQuestion = null;
//   let currentAnswer = null;

//   // Loop through the lines and extract the questions and answers
//   lines.forEach((line) => {
//     // Check if the line starts with a number followed by a period
//     if (/^\d+\./.test(line)) {
//       // If the line starts with a number and period, it's a new question

//       // If there was a previous question, add it to the questions array
//       if (currentQuestion) {
//         questions.push(currentQuestion);
//       }

//       // Reset the current question and answer variables
//       currentQuestion = {
//         title: line.replace(/^\d+\.\s+/, ""),
//         choices: [],
//       };
//       currentAnswer = null;
//     } else if (currentQuestion && line.startsWith("Answer:")) {
//       // If there is a current question and the line starts with "Answer:", it's the answer to the current question
//       currentAnswer = line.replace("Answer:", "").trim();
//       currentQuestion.answer = currentAnswer;
//       questions.push(currentQuestion);
//       currentQuestion = null;
//       currentAnswer = null;
//     } else if (currentQuestion) {
//       // If there is a current question, add the line as a choice
//       const choiceId = line.trim().charAt(0);
//       const choiceValue = line.trim().substring(2);
//       currentQuestion.choices.push({ id: choiceId, value: choiceValue });
//     }
//   });

//   return questions;
// };
const extractQuestionsText = (text) => {
  // Remove empty lines from the text
  text = text.replace(/^\s*\n/gm, "");

  const questions = [];

  // Split the text into an array of lines
  const lines = text.split("\n");

  // Initialize variables to keep track of the current question
  let currentQuestion = null;
  let currentAnswer = null;
  let currentExplanation = null;

  // Loop through the lines and extract the questions, answers, and explanations
  lines.forEach((line, index) => {
    // Check if the line starts with a number followed by a period
    if (/^\d+\./.test(line)) {
      // If the line starts with a number and period, it's a new question

      // If there was a previous question, add it to the questions array
      if (currentQuestion) {
        // Add the current explanation to the current question
        currentQuestion.explanation = currentExplanation || "No explanation.";

        // Reset the current explanation
        currentExplanation = null;

        questions.push(currentQuestion);
      }

      // Reset the current question and answer variables
      currentQuestion = {
        title: line.replace(/^\d+\.\s+/, ""),
        choices: [],
      };
      currentAnswer = null;
    } else if (currentQuestion && line.startsWith("Answer:")) {
      // If there is a current question and the line starts with "Answer:", it's the answer to the current question
      currentAnswer = line.replace("Answer:", "").trim();
      currentQuestion.answer = currentAnswer;
    } else if (
      currentQuestion &&
      index !== lines.length - 1 &&
      /^\d+\./.test(lines[index + 1])
    ) {
      // If there is a current question and the next line starts with a number and period, it's the explanation to the current question
      currentExplanation = line.trim();
    } else if (currentQuestion) {
      // If there is a current question, add the line as a choice
      const choiceId = line.trim().charAt(0);
      const choiceValue = line.trim().substring(2);
      currentQuestion.choices.push({ id: choiceId, value: choiceValue });
    }
  });

  // Add the last question to the questions array
  if (currentQuestion) {
    // Add the current explanation to the current question
    currentQuestion.explanation = currentExplanation || "No explanation.";
    questions.push(currentQuestion);
  }

  return questions;
};

const extractQuestions = async (req, res) => {
  try {
    const file = req.file;
    if (file.mimetype === "application/pdf") {
      //   extract text from PDF

      pdfParse(file.buffer, { preserveLineBreaks: true }).then((data) => {
        res.send(extractQuestionsText(data.text));
      });
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      mammoth
        .extractRawText({ buffer: file.buffer })
        .then((result) => {
          res.send(extractQuestionsText(result.value));
        })
        .done();
    } else if (file.mimetype === "text/plain") {
      // extract text from TXT
      const text = file.buffer.toString("utf-8");
      res.send(extractQuestionsText(text));
    } else {
      res.status(400).json({ message: "File must be a PDF, DOCX, or TXT" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured trying to extract the text" });
  }
};

module.exports = extractQuestions;
