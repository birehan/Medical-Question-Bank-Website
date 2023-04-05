import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  Stack,
  Typography,
  ListItem,
  Link,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import HelperText from "../../../components/HelperText.js";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HelpIcon from "@mui/icons-material/Help";
import { updateLikes } from "../actions/questions.js";

const QuestionDetail = ({
  openQuestionDetail,
  setOpenQuestionDetail,
  questionSet,
}) => {
  const { currentUser } = useSelector((state) => state.users);
  const [course, setCourse] = useState(null);
  const [unit, setUnit] = useState(null);

  const { courses, units } = useSelector((state) => state.courses);
  // const { units } = useSelector((state) => state.courseDetail);

  useEffect(() => {
    if (courses && courses?.length) {
      setCourse(
        courses?.filter((course) => course?.id === questionSet?.courseId)[0]
      );
    }
    if (units && units?.length) {
      setUnit(units?.filter((unit) => unit?.id === questionSet?.unitId)[0]);
    }
  }, [questionSet]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLike = () => {
    if (currentUser) {
      const data = {
        id: questionSet?.id,
        userId: currentUser?.id,
      };
      dispatch(updateLikes(data));
    }
  };
  return (
    <Drawer
      anchor="right"
      open={openQuestionDetail}
      onClose={() => setOpenQuestionDetail(false)}
      sx={{
        position: "relative",
        "& .MuiDrawer-paper": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          "&:hover": {
            cursor: "pointer",
            color: "red",
          },
        }}
        onClick={() => setOpenQuestionDetail(false)}
      />

      <List
        sx={{
          width: { xs: "90vw", sm: "70vw", md: "500px" },

          // border: "10px solid red",
          height: "60vh",
          overflow: "auto",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack>
          <ListItem Button>
            <Link
              sx={{
                color: "black",
                fontSize: "27px",
                textDecoration: "none",
                p: "5px 0",

                "&:hover": {
                  cursor: "pointer",
                  color: "#4d99b6",
                  transition: "300ms all ease-in",
                },
                width: "100%",
                textAlign: "center",
              }}
            >
              {questionSet?.title}
            </Link>
          </ListItem>

          <Divider />
          <ListItem Button sx={{ display: "flex" }}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <HelpIcon sx={{ color: "#20839e", fontSize: "2.3rem" }} />
                <Stack sx={{ alignItems: "center" }}>
                  <Typography>{questionSet?.questionCount}</Typography>
                  <Typography>Questions</Typography>
                </Stack>
              </Stack>

              <Stack
                sx={{
                  flexDirection: "row",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                {questionSet?.likes?.includes(currentUser?.id) ? (
                  <FavoriteIcon
                    sx={{
                      color: "red",
                      "&:hover": {
                        cursor: "pointer",
                      },
                      fontSize: "2rem",
                    }}
                    onClick={handleLike}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                      fontSize: "2rem",
                    }}
                    onClick={handleLike}
                  />
                )}
                <Stack sx={{ alignItems: "center" }}>
                  <Typography>{questionSet?.likes?.length}</Typography>
                  <Typography>Likes</Typography>
                </Stack>
              </Stack>
            </Stack>
          </ListItem>

          <Divider />
          <ListItem Button sx={{ display: "flex" }}>
            <Stack>
              <HelperText text="Course" />
              {course ? (
                <Typography
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    p: "5px 0",
                    width: "100%",
                    opacity: "0.5",
                    mt: "15px",
                  }}
                >
                  {course.title}
                </Typography>
              ) : (
                ""
              )}
            </Stack>
          </ListItem>
          <Divider />
          {unit ? (
            <ListItem Button sx={{ display: "flex" }}>
              <Stack>
                <HelperText text="Unit" />
                <Typography
                  sx={{
                    color: "black",
                    textDecoration: "none",
                    p: "5px 0",
                    width: "100%",
                    opacity: "0.5",
                    mt: "15px",
                  }}
                >
                  {unit.title}
                </Typography>
              </Stack>
            </ListItem>
          ) : (
            ""
          )}

          <Divider />

          <ListItem sx={{ display: "flex" }}>
            <Stack>
              <HelperText text="Description" />
              <Typography
                sx={{
                  color: "black",
                  textDecoration: "none",
                  p: "5px 0",
                  width: "100%",
                  opacity: "0.5",
                  mt: "15px",
                  overflow: "auto",
                }}
              >
                {questionSet?.description}
              </Typography>
            </Stack>
          </ListItem>
          <Divider />
        </Stack>
        <Button
          onClick={() =>
            navigate(`/questions/${questionSet?.id}`, {
              state: { questionSet: questionSet },
            })
          }
          sx={{
            width: "60%",
            background: "#0EAFAF",
            borderRadius: "5px",
            color: "white",
            fontWeight: "bold",
            m: "20px auto 0",
            fontSize: "1.05rem",
            "&:hover": {
              background: "#078989",
              transition: "400ms all easy-in",
            },
            display: "flex",
            padding: "8px 20px !important",
          }}
        >
          Start Quiz
        </Button>
      </List>
    </Drawer>
  );
};

export default QuestionDetail;
