import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  CardActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const QuestionSetCard = ({ questionSet }) => {
  return (
    <Card
      sx={{
        width: { xs: "260px", md: "260px", lg: "300px" },
        height: "200px",
        padding: "10px",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Stack sx={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Typography
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
            {questionSet?.title}
          </Typography>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: "5",
            }}
          >
            <FavoriteBorderIcon />
            <Typography>{questionSet?.likes}</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{ mt: "10px", height: "80px" }}
          variant="body2"
          color="text.secondary"
        >
          {questionSet?.description}
        </Typography>
        <Typography>
          {/* <span style={{ color: "#078989", fontWeight: "bold" }}>
            {questionSet?.questionCount}
          </span> */}
          {questionSet?.questionCount} questions
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuestionSetCard;
