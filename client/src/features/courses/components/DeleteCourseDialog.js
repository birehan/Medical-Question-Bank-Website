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
import { deleteCourse } from "../actions/courses";
import { useDispatch } from "react-redux";

const DeleteCourse = ({ openDeleteCourse, setOpenDeleteCourse, course }) => {
  const dispatch = useDispatch();
  console.log("course: ", course);

  return (
    <div>
      <Dialog
        open={openDeleteCourse}
        onClose={() => setOpenDeleteCourse(false)}
      >
        <DialogTitle>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { lg: "18px", xs: "15px" },
              fontWeight: "550",
            }}
          >
            Delete Course {course.title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenDeleteCourse(false)}
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
            Are you sure to delete this course. Note all questions under this
            course also will be deleted.
          </Typography>

          <Button
            onClick={() => {
              console.log("id: ", course?.id);
              dispatch(deleteCourse(course?.id));
              setOpenDeleteCourse(false);
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
            }}
          >
            Delete Course
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteCourse;
