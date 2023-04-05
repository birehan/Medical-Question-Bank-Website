export const validateQuestion = (question) => {
  const errors = [];

  if (!question.title) {
    errors.push({
      field: "title",
      type: "required",
      message: "Title is required",
    });
  }

  question.choices.forEach((choice, index) => {
    if (!choice.value) {
      errors.push({
        field: `choices[${index}].value`,
        type: "required",
        message: "Choice value is required",
      });
    }
  });

  if (!question.answer) {
    errors.push({
      field: "answer",
      type: "required",
      message: "Answer is required",
    });
  }

  if (!question.explanation) {
    errors.push({
      field: "explanation",
      type: "required",
      message: "explanation is required",
    });
  }

  return errors.length ? errors : null;
};
