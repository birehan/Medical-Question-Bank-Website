import * as React from "react";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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
import { useDispatch } from "react-redux";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import useStyles from "../../../components/Style.js";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import UnitFilter from "../../units/components/UnitFilter.js";

export default function UnitFilterDropDown({
  units,
  setfilterUnit,
  filterUnit,
}) {
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
      <Stack
        onClick={handleUploadClick}
        sx={{
          flexDirection: "row",
          // border: "1px solid green",
          mt: "25px",
          gap: "5px",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <FilterAltIcon />
        <Typography
          sx={{
            fontSize: "1.43rem",
          }}
        >
          Filter
        </Typography>
      </Stack>

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
        <Box
          sx={{
            width: { xs: "300px", sm: "320px", md: "350px" },
            padding: "20px",
          }}
        >
          <UnitFilter
            filterUnit={filterUnit}
            setfilterUnit={setfilterUnit}
            units={units}
          />
        </Box>
      </Menu>
    </React.Fragment>
  );
}
