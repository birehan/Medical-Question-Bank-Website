import React, { useState } from "react";
import {
  Button,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile.js";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

import DrawerComponent from "./Drawer.js";

const useStyles = styled({
  headerLinks: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: { xs: "20px", lg: "24px" },
    lineHeight: "29px",
    "&:hover": {
      cursor: "pointer",
      color: "#039198",
      transition: "400ms all ease-in",
    },
  },
});

const Header = () => {
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const classes = useStyles().__emotion_base;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const [selected, setSelected] = useState("");
  console.log("path: ", pathname);

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    var header = document.getElementById("myHeader");
    var sticky = header?.offsetTop;

    if (window.pageYOffset > sticky) {
      header?.classList?.add("sticky");
    } else {
      header?.classList?.remove("sticky");
    }
  }

  return (
    <Box id="myHeader" className="header" sx={{}}>
      <DrawerComponent openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

      <Box
        onClick={() => {
          navigate("/");
        }}
        component="img"
        alt="logo"
        src={Logo}
        sx={{
          width: "70px",
          height: "70px",
          ml: { xs: "20px", md: "50px" },
          "&:hover": {
            cursor: "pointer",
          },
        }}
      ></Box>

      {isMatch ? (
        <IconButton
          sx={{ color: "black", mr: "20px" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon color="black" />
        </IconButton>
      ) : (
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "end !important",
            alignItems: "center",
            margin: "auto 70px auto 0px",
            gap: "50px",
            // border: "1px solid green",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            {" "}
            <Stack
              sx={{
                flexDirection: "row",
                gap: { md: "40px", lg: "100px" },
                height: "35px",
              }}
            >
              <Box
                onClick={() => {
                  setSelected("questions");
                  navigate("/home");
                }}
                title="Questions"
                sx={{
                  ...classes.headerLinks,
                  color: pathname === "/home" ? "#00B5BE" : "#263238",
                  borderBottom: pathname === "/home" ? "3px solid #00B5BE" : "",
                }}
              >
                Questions
              </Box>
              <Box
                onClick={() => {
                  setSelected("about");
                  navigate("/about");
                }}
                title="About"
                sx={{
                  ...classes.headerLinks,
                  color: pathname === "/about" ? "#00B5BE" : "#263238",
                  borderBottom:
                    pathname === "/about" ? "3px solid #00B5BE" : "",
                }}
              >
                About
              </Box>
              <Box
                onClick={() => {
                  setSelected("testimonials");
                  navigate("/testimonials");
                }}
                title="Testimonials"
                sx={{
                  ...classes.headerLinks,
                  color: pathname === "/testimonials" ? "#00B5BE" : "#263238",
                  borderBottom:
                    pathname === "/testimonials" ? "3px solid #00B5BE" : "",
                }}
              >
                Testimonials
              </Box>
              <Box
                onClick={() => {
                  setSelected("contact");
                  navigate("/contact");
                }}
                title="Contact"
                sx={{
                  ...classes.headerLinks,
                  color: pathname === "/contact" ? "#00B5BE" : "#263238",
                  borderBottom:
                    pathname === "/contact" ? "3px solid #00B5BE" : "",
                }}
              >
                Contact-us
              </Box>
            </Stack>
          </Box>
          {currentUser ? (
            <Profile />
          ) : (
            <Button
              title="Login/Register"
              onClick={() => navigate("/login")}
              sx={{
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
              }}
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
