import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteCourse from "./DeleteCourseDialog";

import {
  Stack,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import { textAlign } from "@mui/system";

const CourseCard = (course) => {
  const { currentUser } = useSelector((state) => state.users);

  const [openDeleteCourse, setOpenDeleteCourse] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      onClick={() => navigate(`/course/${course?.course?.id}`)}
      className="course-card"
      sx={{
        maxWidth: 350,
        minWidth: 350,
        minHeight: 300,
        // maxHeight: 450,

        borderRadius: "20px",
        "&:hover": {
          cursor: "pointer",
        },
        textAlign: "center",
      }}
    >
      {openDeleteCourse && currentUser?.role === "admin" ? (
        <DeleteCourse
          openDeleteCourse={openDeleteCourse}
          setOpenDeleteCourse={setOpenDeleteCourse}
          course={course?.course}
        />
      ) : (
        ""
      )}

      <Box
        sx={{
          width: "270px",
          margin: "auto",
          padding: "30px 30px 20px 30px !important",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={`/uploads/${course?.course?.image}`}
          sx={{
            border: "1px solid silver",

            borderRadius: "20px",
            objectFit: "fill",
            height: "250px",
            width: "250px",
            margin: "auto",
          }}
        />
      </Box>
      <CardContent sx={{}}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              color: "#078989",
              fontWeight: "bold",
            }}
          >
            {course?.course?.title}
          </Typography>

          {currentUser?.role === "admin" ? (
            <Box
              sx={{ position: "absolute", right: "0" }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Box>
          ) : (
            ""
          )}
        </Stack>
        <Typography
          gutterBottom
          component="div"
          sx={{
            color: "black",
          }}
        >
          {course?.course?.description}
          {/* {course?.image} */}
        </Typography>
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
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
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
            navigate(`/course/crud`, { state: { course: course?.course } });
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
            setOpenDeleteCourse(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default CourseCard;
