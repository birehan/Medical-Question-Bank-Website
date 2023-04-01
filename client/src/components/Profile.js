import * as React from "react";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import {
  Stack,
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOutUser } from "../features/authentication/actions/users.js";
import { useDispatch } from "react-redux";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import useStyles from "./Style.js";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUpload, setAnchorUpload] = React.useState(null);

  const open = Boolean(anchorEl);
  const openUpload = Boolean(anchorUpload);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = (event) => {
    setAnchorUpload(event.currentTarget);
  };
  const handleUploadClose = () => {
    setAnchorUpload(null);
  };
  return (
    <React.Fragment>
      <Box sx={useStyles.profileAvatorStyle}>
        {currentUser?.role === "admin" ? (
          <Button
            onClick={handleUploadClick}
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
            }}
          >
            Upload
          </Button>
        ) : (
          ""
        )}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2, fontSize: "2rem" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "red",
                textTransform: "capitalize",
              }}
            >
              {currentUser?.name ? currentUser?.name[0] : ""}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorUpload}
        id="account-menu"
        open={openUpload}
        onClose={handleUploadClose}
        onClick={handleUploadClose}
        PaperProps={useStyles.profileMenuStyle}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />

        <MenuItem
          onClick={() => {
            handleUploadClose();
            navigate(`/course/crud`);
          }}
        >
          <ListItemIcon>
            <SubjectOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Course
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleUploadClose();
            navigate(`/unit/crud`);
          }}
        >
          <ListItemIcon>
            <AcUnitIcon fontSize="small" />
          </ListItemIcon>
          Unit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleUploadClose();
            navigate(`/questions/crud`);
          }}
        >
          <ListItemIcon>
            <QuestionMarkOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Questions
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={useStyles.profileMenuStyle}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack sx={useStyles.profileContainer}>
          <Typography sx={{ fontWeight: "bold" }}>
            {currentUser?.name?.slice(0, 15)}
            {currentUser?.name?.length > 15 ? "..." : ""}
          </Typography>
        </Stack>

        <Divider />

        {/* <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/profile/${currentUser?.id}`);
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logOutUser());
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
