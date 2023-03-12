import React, { useEffect, useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Header from "../components/Header";

import Search from "../components/Search.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourses, cleanUp } from "../features/courses/actions/courses";
import CourseCard from "../features/courses/components/CourseCard";
import UnitSection from "../features/units/components/UnitContent";

const HomePage = () => {
  const { courses, success } = useSelector((state) => state.courses);

  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() =>
    courses?.filter(
      (course) =>
        course["title"]?.toLowerCase()?.startsWith(search?.toLowerCase()),
      [search?.toLowerCase()]
    )
  );

  const handleSearch = (text) => {
    setSearch(text);
  };

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

  return (
    <Box
      className="home-container"
      sx={{
        backgroundColor: "#f6f9fa !important",
        height: "100vh",
      }}
    >
      <Header />

      <Box
        sx={{
          borderColor: "#f6f9fa !important",
          backgroundColor: "#f6f9fa !important",
        }}
      >
        <Stack
          sx={{
            overflow: "auto",
            padding: "20px 20px 50px",
            gap: "20px",
            width: { xs: "90vw", md: "85vw", lg: "80vw" },
            margin: "0px auto",
            // padding: "10px 10px 50px",
          }}
        >
          {/* <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: "2em",
              textAlign: "center",
            }}
          >
            Courses
          </Typography> */}
          <Search handleSearch={handleSearch} />

          <Stack>
            {filteredJobs && filteredJobs.length ? (
              <Stack
                className="course-container"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "60px",
                  padding: "60px",
                  justifyContent: { xs: "center", lg: "start" },
                  // border: "5px solid green",
                }}
              >
                {filteredJobs.map((course, index) => {
                  return <CourseCard course={course} key={index} />;
                })}
              </Stack>
            ) : (
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "60px",
                  padding: "30px",
                  justifyContent: { xs: "center", lg: "center" },
                  // border: "5px solid green",
                  background: "white",
                  borderRadius: "10px",
                  mt: "30px",
                }}
              >
                {" "}
                <Typography>No Course Found!</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
