import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogActions, Box } from "@mui/material";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CompleteDialog from "./CompleteDialog";

export default function DoneDialog({ qestionStates }) {
  const [open, setOpen] = React.useState(false);
  const [openComplete, setOpenComplete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
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
          // fontSize: "26px !important",
          // lineHeight: "32px",
        }}
      >
        Done
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            // border: "3px solid green",
            padding: { xs: "10px", md: "10px 30px 10px 10px" },
            width: {
              xs: "250px",
              md: "300px",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">Are You Sure?</DialogTitle>
          <DialogContent sx={{}}>
            <DialogContentText id="alert-dialog-description">
              This will end your exam session
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                background: "rgb(234, 234, 234)",
                color: "black",
              }}
              onClick={handleClose}
            >
              No
            </Button>
            <Button
              sx={{
                background: "#20839e",
                color: "white",
                "&:hover": {
                  color: "black",
                },
              }}
              onClick={() => {
                setOpen(false);
                setOpenComplete(true);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      {openComplete ? (
        <CompleteDialog
          setOpenComplete={setOpenComplete}
          openComplete={openComplete}
          qestionStates={qestionStates}
        />
      ) : (
        ""
      )}
    </div>
  );
}
