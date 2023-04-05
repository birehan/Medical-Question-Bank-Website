import React, { useState } from "react";
import {
  Button,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile.js";
import Logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerComponent from "./Drawer.js";

const links = [
  {
    name: "Questions",
    path: "/home",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Testimonials",
    path: "/testimonials",
  },
  {
    name: "Contact-Us",
    path: "/contact",
  },
];

const useStyles = {
  header: {
    boxShadow: "0px 0px 40px -25px rgba(0, 0, 0, 0.5)",
    zIndex: "10 !important",
    height: "80px !important",
    display: "flex",
    alignItems: "center !important",
    justifyContent: "space-between !important",
    background: "white",
    color: "#f1f1f1",
    position: "fixed",
    top: 0,
    width: "100vw",
  },
  headerLinks: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: { xs: "20px", lg: "22px" },

    lineHeight: "29px",
    "&:hover": {
      cursor: "pointer",
      color: "#039198",
      transition: "400ms all ease-in",
    },
    color: "#263238",
  },
  selectedLink: {
    color: "#00B5BE !important",
    borderBottom: "3px solid #00B5BE",
  },
  registerButton: {
    border: "2px solid #00B5BE",
    borderRadius: "5px",
    height: "40px !important",
    textTransform: "capitalize",
    color: "black",
    fontSize: "1.1rem",
    padding: "5px 15px !important",
    "&:hover": {
      color: "#018890",

      transition: "400ms all ease-in",
      background: "transparent",
    },
  },
  Mlogo: {
    width: "55px",
    height: "55px",
    ml: { xs: "20px", md: "50px" },
    "&:hover": {
      cursor: "pointer",
    },
  },
  container: {
    flexDirection: "row",
    justifyContent: "end !important",
    alignItems: "center",
    margin: "auto 70px auto 0px",
    gap: "50px",
  },
  linksContainer: {
    flexDirection: "row",
    gap: { md: "40px", lg: "100px" },
    height: "35px",
  },
};

const Header = () => {
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={useStyles.header}>
      {openDrawer && (
        <DrawerComponent
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      )}

      <Box
        onClick={() => {
          navigate("/");
        }}
        component="img"
        alt="logo"
        src={Logo}
        sx={useStyles.Mlogo}
      ></Box>

      {isMatch ? (
        <IconButton
          sx={{ color: "black", mr: "20px" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="black" />
        </IconButton>
      ) : (
        <Stack sx={useStyles.container}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            {" "}
            <Stack sx={useStyles.linksContainer}>
              {links.map((link, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      navigate(link.path);
                    }}
                    title={link.name}
                    sx={{
                      ...useStyles.headerLinks,
                      ...(pathname === link.path && useStyles.selectedLink),
                    }}
                  >
                    {link.name}
                  </Box>
                );
              })}
            </Stack>
          </Box>
          {currentUser ? (
            <Profile />
          ) : (
            <Button
              title="Login/Register"
              onClick={() => navigate("/login")}
              sx={useStyles.registerButton}
            >
              Login/Register
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Header;
