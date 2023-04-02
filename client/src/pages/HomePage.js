import React, { useEffect, useState, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import Header from "../components/Header";

import Search from "../components/Search.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import { getAllUnits } from "../features/units/actions/units";

import CourseList from "../features/courses/components/CourseList";
import Loading from "../components/Loading.js";
import Footer from "../components/Footer";
import BottomCurve from "../assets/home_bottom_curve.png";

import { getLoggedUser } from "../features/authentication/actions/users";

const HomePage = () => {
  const { courses, success } = useSelector((state) => state.courses);
  const { currentUser } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");

  const handleSearch = (text) => {
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

  // const hasFetchedData = localStorage.getItem("hasFetchedData");

  // useEffect(() => {
  //   if (!hasFetchedData || !courses) {
  //     dispatch(getCourses());
  //     dispatch(getAllUnits());

  //     localStorage.setItem("hasFetchedData", true);
  //     localStorage.setItem("lastFetchedTime", new Date().getTime());
  //   }
  //   if (courses && hasFetchedData) {
  //     const now = new Date().getTime();
  //     const twentyFourHoursInMs = 1 * 60 * 60 * 1000;
  //     const lastFetchedTime = localStorage.getItem("lastFetchedTime");

  //     if (lastFetchedTime && now - lastFetchedTime > twentyFourHoursInMs) {
  //       dispatch(getCourses());
  //       dispatch(getAllUnits());
  //       localStorage.setItem("hasFetchedData", true);
  //       localStorage.setItem("lastFetchedTime", new Date().getTime());
  //     }
  //   }
  //   if (!currentUser) {
  //     dispatch(getLoggedUser());
  //   }
  // }, []);

  useEffect(() => {
    if (success) {
      dispatch(cleanUp());
    }
  }, [success]);

  if (!filteredJobs || !courses) {
    return <Loading />;
  }

  return (
    <Box
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
          marginTop: "80px",
        }}
      >
        <Stack
          sx={{
            overflow: "auto",
            padding: "0px 30px 0px",
            gap: "20px",
            width: { xs: "85vw", md: "85vw", lg: "80vw" },
            margin: "auto auto auto",
          }}
        >
          <Box sx={{ mt: "20px" }}>
            <Search handleSearch={handleSearch} helperText="Search a course" />
          </Box>
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
      <Box sx={{ mt: "20px" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
