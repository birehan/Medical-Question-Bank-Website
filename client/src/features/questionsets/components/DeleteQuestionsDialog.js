import React from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  IconButton,
  Divider,
  Typography,
  DialogContent,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteQuestions } from "../actions/questions";

const DeleteQuestionSet = ({
  openDeleteQuestions,
  setOpenDeleteQuestions,
  questionSet,
}) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        open={openDeleteQuestions}
        onClose={() => setOpenDeleteQuestions(false)}
      >
        <DialogTitle>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { lg: "18px", xs: "15px" },
              fontWeight: "550",
            }}
          >
            Delete Question set
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDeleteQuestions(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon color="white" />
          </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent
          sx={{
            alignItems: "center",
            minWidth: { lg: "350px", md: "350px", xs: "250px" },
            maxWidth: { lg: "450px", md: "400px", xs: "350px" },
          }}
        >
          <Typography sx={{ color: "red" }}>
            Are you sure to delete question set{" "}
          </Typography>
          <p style={{ color: "black" }}>{questionSet?.title}</p>

          <Button
            onClick={() => {
              dispatch(deleteQuestions(questionSet?.id));
              setOpenDeleteQuestions(false);
            }}
            className="login-submit"
            sx={{
              background: "Red",
              width: "100%",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              textAlign: "center",
              margin: "auto",
              display: "block",
              marginTop: "30px",
              marginBottom: "10px",
              "&:hover": {
                background: "Red",
                opacity: "0.7",
              },
            }}
          >
            Delete Question Set
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteQuestionSet;
