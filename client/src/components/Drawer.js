import React from "react";
import {
  Drawer,
  List,
  Button,
  Stack,
  Typography,
  ListItem,
  Link,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";

import { logOutUser } from "../features/authentication/actions/users.js";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Logo from "../assets/logo.png";

const links = [
  {
    name: "Home",
    path: "/",
  },
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
  loginLinks: {
    color: "white",
    background: "#039198",
    borderRadius: "70px",
    padding: "2px 30px",
    // fontSize: { lg: "18px", md: "16px" },

    "&:hover": {
      background: "#039198",

      border: "1px solid #4d99b6",
      // transition: "300ms all ease-in",
      opacity: "0.7",
    },
  },
};
const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem Button>
            <Link
              onClick={() => navigate("/")}
              sx={{
                color: "black",
                fontSize: { lg: "27px", md: "22px" },
                textDecoration: "none",
                p: "5px 0",

                "&:hover": {
                  cursor: "pointer",
                  color: "#4d99b6",
                  transition: "300ms all ease-in",
                },
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box> </Box>
                <Box>
                  {" "}
                  <Link
                    onClick={() => {
                      navigate("/");
                      setOpenDrawer(false);
                    }}
                    sx={{
                      textDecoration: "none",
                      color: "#078989",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <Box
                        component="img"
                        alt="logo"
                        src={Logo}
                        sx={{
                          width: "40px",
                          height: "40px",
                        }}
                      ></Box>

                      <Typography
                        sx={{ mt: "20px", fontSize: "20px", color: "#078989" }}
                      >
                        edical Question Bank
                      </Typography>
                    </Stack>
                  </Link>
                </Box>

                <CloseIcon onClick={() => setOpenDrawer(false)} />
              </Stack>
            </Link>
          </ListItem>

          {currentUser ? (
            <Stack>
              <Divider />
              <ListItem Button>
                <Link
                  sx={{
                    color: "black",
                    fontSize: { lg: "20px", md: "22px" },
                    textDecoration: "none",
                    "&:hover": {
                      cursor: "pointer",
                      color: "#4d99b6",
                      transition: "300ms all ease-in",
                    },
                    width: "100%",
                  }}
                >
                  <Stack
                    sx={{
                      flexDirection: "row",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "silver", fontSize: "2rem" }}
                    />
                    <Typography sx={{ fontWeight: "bold" }}>
                      {currentUser?.name}
                    </Typography>
                  </Stack>
                </Link>
              </ListItem>
            </Stack>
          ) : (
            ""
          )}
          <Divider />
          {links.map((link, index) => {
            return (
              <Stack key={index}>
                <ListItem Button>
                  <Link
                    onClick={() => {
                      navigate(link.path);
                      setOpenDrawer(false);
                    }}
                    sx={{
                      color: "black",
                      fontSize: { lg: "27px", md: "22px" },
                      textDecoration: "none",
                      p: "5px 0",

                      "&:hover": {
                        cursor: "pointer",
                        color: "#4d99b6",
                        transition: "300ms all ease-in",
                      },
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        // color: "white",
                        fontSize: "1.2rem",
                        fontWeight: "400",
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Link>
                </ListItem>
                <Divider />
              </Stack>
            );
          })}

          {currentUser ? (
            <ListItem Button>
              <Link
                onClick={() => {
                  setOpenDrawer(false);
                  dispatch(logOutUser());
                }}
                sx={{
                  color: "black",
                  textDecoration: "none",
                  // p: "10px 0",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#4d99b6",
                    transition: "300ms all ease-in",
                  },
                  width: "100%",
                  display: "flex",
                  gap: "10px",
                  fontSize: "22px",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Logout
                    sx={{
                      // color: "white",
                      fontSize: "1.2rem",
                    }}
                    fontSize="medium"
                  />
                  <Typography
                    sx={{
                      // color: "white",
                      fontSize: "1.2rem",
                      fontWeight: "400",
                    }}
                  >
                    Logout
                  </Typography>
                </Stack>
              </Link>
            </ListItem>
          ) : (
            <ListItem Button>
              <Box
                sx={{
                  color: "black",
                  textDecoration: "none",
                  p: "10px 0",
                  "&:hover": {
                    cursor: "pointer",
                    color: "#4d99b6",
                    transition: "300ms all ease-in",
                  },
                  width: "100%",
                  display: "flex",
                  gap: "50px",
                  fontSize: "22px",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => navigate("/login")}
                  sx={useStyles.loginLinks}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  sx={useStyles.loginLinks}
                >
                  Sign Up
                </Button>
              </Box>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
