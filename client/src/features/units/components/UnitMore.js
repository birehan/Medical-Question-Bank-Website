import * as React from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteUnit from "./UnitDeleteDialog";

import {
  Stack,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";

const UnitMore = ({ setIsUpdate, setOpenUnitForm, unit, setSelectedUnit }) => {
  const [openDeleteUnit, setOpenDeleteUnit] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ position: "relative", m: "auto" }}>
      {openDeleteUnit ? (
        <DeleteUnit
          openDeleteUnit={openDeleteUnit}
          setOpenDeleteUnit={setOpenDeleteUnit}
          unit={unit}
          setSelectedUnit={setSelectedUnit}
        />
      ) : (
        ""
      )}

      <Box
        onClick={handleClick}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <MoreVertIcon sx={{ fontSize: "2rem" }} />
      </Box>
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
            // navigate(`/course/crud`, { state: { course: course?.course } });
            setIsUpdate(true);
            setOpenUnitForm(true);
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
            setOpenDeleteUnit(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default UnitMore;
