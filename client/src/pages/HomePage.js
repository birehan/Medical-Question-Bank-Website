import React, { useEffect, useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Header from "../components/Header";

import Search from "../components/Search.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import CourseCard from "../features/courses/components/CourseCard";
import UnitSection from "../features/units/components/UnitContent";
import CourseList from "../features/courses/components/CourseList";
import Loading from "../components/Loading.js";
import Footer from "../components/Footer";
import BottomCurve from "../assets/home_bottom_curve.png";

const HomePage = () => {
  const { courses, success } = useSelector((state) => state.courses);

  const [search, setSearch] = useState("");
  console.log("course: ", courses);

  const handleSearch = (text) => {
    console.log(courses);
    setSearch(text);
  };
  let filteredJobs = useMemo(() =>
    courses?.filter(
      (course) =>
        course["title"]?.toLowerCase()?.startsWith(search?.toLowerCase()),
      [search?.toLowerCase()]
    )
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!courses) {
      dispatch(getCourses());
    }
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(cleanUp());
    }
  }, [success]);

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

  if (!filteredJobs || !courses) {
    return <Loading />;
  }

  return (
    <Box
      className="home-container"
      sx={{
        backgroundColor: "#f6f9fa !important",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Header />
      <Box
        sx={{
          borderColor: "#f6f9fa !important",
          backgroundColor: "#f6f9fa !important",
          marginTop: "100px",
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
          <Search handleSearch={handleSearch} helperText="Search a course" />
          <CourseList filteredJobs={filteredJobs} />
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
            margin: "50px auto 0px",
            height: "80px",
          },
        }}
        component="img"
        alt="curve"
        src={BottomCurve}
      ></Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
