import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionDetail from "./questionDetail";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateLikes } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import DeleteQuestionSet from "./DeleteQuestionsDialog";

const QuestionSetCard = ({ questionSet }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDeleteQuestions, setOpenDeleteQuestions] = React.useState(false);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLike = () => {
    if (currentUser) {
      const data = {
        id: questionSet?.id,
        userId: currentUser?.id,
      };
      dispatch(updateLikes(data));
    }
  };

  const [openQuestionDetail, setOpenQuestionDetail] = useState(false);

  return (
    <Box
      sx={{
        width: { xs: "260px", md: "260px", lg: "300px" },
        minHeight: "200px",
        padding: "10px",
        "&:hover": {
          // cursor: "pointer",
        },
        boxShadow: "0px 0px 40px -25px rgba(0, 0, 0, 0.5)",
        border: "none !important",
        background: "white",
        borderRadius: "10px",
        // flex: 1,
      }}
    >
      {openDeleteQuestions && currentUser?.role === "admin" ? (
        <DeleteQuestionSet
          openDeleteQuestions={openDeleteQuestions}
          setOpenDeleteQuestions={setOpenDeleteQuestions}
          questionSet={questionSet}
        />
      ) : (
        ""
      )}

      {openQuestionDetail ? (
        <QuestionDetail
          openQuestionDetail={openQuestionDetail}
          setOpenQuestionDetail={setOpenQuestionDetail}
          questionSet={questionSet}
        />
      ) : (
        " "
      )}
      <CardContent>
        <Stack
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <Typography
            onClick={() => setOpenQuestionDetail(true)}
            sx={{
              color: "#078989",
              fontWeight: "bold",
              "&:hover": {
                cursor: "pointer",
              },
              fontSize: { xs: "20px", md: "22px" },
              mr: "20px",
            }}
          >
            {questionSet?.title?.slice(0, 20)}
          </Typography>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: "5",
            }}
          >
            {questionSet?.likes?.includes(currentUser?.id) ? (
              <FavoriteIcon
                sx={{
                  color: "red",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={handleLike}
              />
            )}
            <Typography>{questionSet?.likes?.length}</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{ mt: "10px", height: "80px" }}
          variant="body2"
          color="text.secondary"
        >
          {questionSet?.description}
        </Typography>
        <Stack
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "20px",
            position: "relative",
          }}
        >
          <Typography>{questionSet?.questionCount} questions</Typography>
          {currentUser?.role === "admin" ? (
            <Box
              sx={{ position: "absolute", right: "0", zIndex: 5 }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Box>
          ) : (
            ""
          )}
        </Stack>
      </CardContent>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              // top: 0,
              right: 14,
              // width: 10,
              height: 10,
              bgcolor: "background.paper",
              // transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
          fontFamily: "poppins",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />

        <MenuItem
          onClick={() => {
            navigate(`/questions/crud`, {
              state: { questionSet: questionSet },
            });
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteQuestions(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default QuestionSetCard;
