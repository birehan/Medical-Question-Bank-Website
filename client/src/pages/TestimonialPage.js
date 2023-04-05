import React from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import Header from "../components/Header";

import BottomCurve from "../assets/home_bottom_curve.png";

import TestimonialLeftCurve from "../assets/testimonial-left-curve.png";
import TestimonialRightCurve from "../assets/testimonial-right-curve.png";

import BereketImg from "../assets/bereket.png";
import MelatImg from "../assets/melat.png";
import AbelImg from "../assets/abel.png";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const TestimonialPage = () => {
  const testmonials = [
    {
      name: "Bereket Sisay",
      description:
        "Well done guys! I was thinking recently how to develop my habit of doing questions and this website looks promising.",
      imageSrc: BereketImg,
    },
    {
      name: "Melat Tamiru",
      description:
        "This is a good initiative. It will definitely help a lot of medical students for years to come.",
      imageSrc: MelatImg,
    },
    {
      name: "Aleb Girmachew",
      description:
        "To be honest, I’m really impressed by how relatable the questions are. I hope to see more of them in the future. Great job.",
      imageSrc: AbelImg,
    },
  ];

  const handleClick = (size) => {
    document.getElementById("testom-container").scrollBy(size, 0);
  };

  return (
    <Box
      className="home-container"
      sx={{
        backgroundColor: "#f6f9fa !important",
        height: "100vh",
        position: "relative",
        // marginBottom: "30px",
      }}
    >
      <Header />
      <Box
        sx={{
          borderColor: "#f6f9fa !important",
          backgroundColor: "#f6f9fa !important",
          marginTop: "80px",
        }}
      >
        <Stack
          sx={{
            overflow: "auto",
            padding: "20px 20px 50px",
            gap: "20px",
            width: { xs: "90vw", md: "85vw", lg: "80vw" },
            margin: "0px auto",
          }}
        >
          <Stack
            className="testimonial-container"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: { xs: "20px", md: "20px" },
              padding: { xs: "50px 20px", md: "50px" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",

              position: "relative",
              //   border: "3px solid red",
            }}
          >
            <Box
              component="img"
              src={TestimonialLeftCurve}
              sx={{
                position: "absolute",
                bottom: "0",
                left: "0",
              }}
            ></Box>

            <Box
              component="img"
              src={TestimonialRightCurve}
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: { xs: "24px", sm: "28px", md: "32px", lg: "36px" },
                lineHeight: "174%",
                textAlign: "center",
                letterSpacing: "-0.005em",
                color: "#000000",
              }}
            >
              Hear From Former Students
            </Typography>

            <Stack
              id="testom-container"
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "no-wrap",
                gap: { xs: "20px", md: "50px" },
                // padding: { xs: "50px 20px", md: "50px" },
                justifyContent: { xs: "left", xl: "center" },
                overflow: "auto",
                // width: "inherent",
                margin: "0 auto",
                "::-webkit-scrollbar": {
                  width: "0px",
                  height: "0px",
                },
              }}
            >
              {testmonials.map((testmon, index) => {
                return (
                  <Card
                    className="course-card"
                    sx={{
                      minWidth: { xs: "300px", md: "300px", lg: "350px" },
                      maxWidth: { xs: "300px", md: "300px", lg: "350px" },

                      height: { xs: "400px", md: "450px" },

                      borderRadius: "20px",
                      "&:hover": {
                        cursor: "pointer",
                      },
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "85%",
                        margin: "30px 0px 0px 0px !important",
                        height: { xs: "200px", md: "250px" },
                        border: "1px solid silver",
                        borderRadius: "20px",
                      }}
                    >
                      <img
                        src={testmon.imageSrc}
                        alt={testmon.name}
                        width="100%"
                        // height="250px"
                        style={{
                          borderRadius: "20px",
                          height: "inherit",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ width: "85%", flex: "1" }}>
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
                            "&:hover": {
                              cursor: "pointer",
                            },
                            fontSize: { xs: "20px", md: "25px" },
                            mr: "20px",
                          }}
                        >
                          {testmon.name}
                        </Typography>
                      </Stack>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{
                          color: "black",
                        }}
                      >
                        {testmon.description}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>

            <Box
              sx={{
                position: "absolute",
                left: { xs: "5px", md: "15px" },
                margin: "auto 0 !important",
                borderRadius: "50%",
                background: "white",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => handleClick(-200)}
            >
              <KeyboardArrowLeftIcon
                sx={{
                  fontSize: "4rem",
                  fontWeight: "800",
                  color: "#00B5BE",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { xs: "5px", md: "15px" },
                margin: "auto 0 !important",
                borderRadius: "50%",
                background: "white",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => handleClick(200)}
            >
              <KeyboardArrowRightIcon
                sx={{
                  fontSize: "4rem",
                  fontWeight: "800",
                  color: "#00B5BE",
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: {
            // xs: "none",
            md: "flex",
            bottom: "00px",
            left: "0px",
            right: "0",
            margin: "0px auto 0px",
            height: "80px",
          },
        }}
        component="img"
        alt="curve"
        src={BottomCurve}
      ></Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default TestimonialPage;
