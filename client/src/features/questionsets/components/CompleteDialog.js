import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

const styles = {
  button: {
    margin: "10px 0",
    padding: "10px 20px",
  },
  dialogTitle: {
    backgroundColor: "#039198",
    color: "#fff",
  },
  dialogContent: {
    padding: "20px",
  },
  results: {
    listStyle: "none",
    padding: "0",
  },
  resultItem: {
    marginBottom: "10px",
  },
  closeButton: {
    color: "#fff",
    backgroundColor: "#039198",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
};

function CompleteDialog({ openComplete, setOpenComplete, qestionStates }) {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  for (let i = 0; i < qestionStates.length; i++) {
    if (qestionStates[i].correct) {
      correct += 1;
    } else if (qestionStates[i].wrong) {
      wrong += 1;
    } else {
      skipped += 1;
    }
  }

  const handleOpen = () => {
    setOpenComplete(true);
  };

  const handleClose = () => {
    setOpenComplete(false);
  };

  return (
    <Box>
      <Dialog open={openComplete} onClose={handleClose}>
        <Box>
          <DialogTitle
            sx={{
              padding: "20px",
            }}
            style={styles.dialogTitle}
          >
            Exam Completed
          </DialogTitle>
          <Box sx={{ padding: "10px 20px" }}>
            <DialogContent style={styles.dialogContent}>
              <p>Congratulations, you have completed the exam!</p>
              <p>Here are your results:</p>
              <ul style={styles.results}>
                <li style={styles.resultItem}>
                  Correct Answers: {correct}/{correct + wrong + skipped}
                </li>
                <li style={styles.resultItem}>
                  Wrong Answers: {wrong}/{correct + wrong + skipped}
                </li>
                <li style={styles.resultItem}>
                  Skipped Questions: {skipped}/{correct + wrong + skipped}
                </li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={styles.closeButton}>
                OK
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </Box>
    // <div>
    //   <Button variant="contained" color="primary" onClick={handleOpen}>
    //     Exam Completed
    //   </Button>
    //   <Dialog open={openComplete} onClose={handleClose}>
    //     <DialogTitle>Exam Completed</DialogTitle>

    //     <DialogContent>
    //       <p>Congratulations, you have completed the exam!</p>
    //       <p>Here are your results:</p>
    //       <ul>
    //         <li>
    //           Correct Answers: {correct}/{correct + wrong + skipped}
    //         </li>
    //         <li>
    //           Wrong Answers: {wrong}/{correct + wrong + skipped}
    //         </li>
    //         <li>
    //           Skipped Questions: {skipped}/{correct + wrong + skipped}
    //         </li>
    //       </ul>
    //     </DialogContent>

    //     <DialogActions>
    //       <Button onClick={handleClose} color="primary">
    //         OK
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>
  );
}

export default CompleteDialog;
