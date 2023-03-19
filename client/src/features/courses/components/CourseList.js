import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import CourseCard from "./CourseCard";
import Loader from "../../../components/Loader";

const CourseList = ({ filteredJobs }) => {
  const [curPage, setCurPage] = useState(1);
  const exercisePerPage = 6;

  const lastIndex = curPage * exercisePerPage;
  const firstIndex = lastIndex - exercisePerPage;
  const curExercises = filteredJobs?.slice(firstIndex, lastIndex);

  const paginate = (event, value) => {
    setCurPage(value);
    window.scrollTo({ top: 0 });
  };
  useEffect(() => {
    setCurPage(1);
  }, [filteredJobs]);

  if (!filteredJobs) {
    return <Loader />;
  }

  return (
    <Box>
      <Stack>
        {curExercises && curExercises.length ? (
          <Stack
            className="course-container"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: { xs: "20px", md: "50px" },
              padding: { xs: "20px", md: "50px" },
              justifyContent: { xs: "center", lg: "center" },
              // border: "5px solid green",
            }}
          >
            {curExercises.map((course, index) => {
              return <CourseCard course={course} key={index} />;
            })}
          </Stack>
        ) : (
          <Box className="no-course">
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
          </Box>
        )}
      </Stack>
      <Stack sx={{ margin: "50px auto", alignItems: "center" }}>
        {filteredJobs?.length > 6 && (
          <Pagination
            sx={{
              color: "#078989",
              //   border: "5px solid green",
              ul: {
                color: "red",
              },
              ".css-yx0nvq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected ":
                {
                  background: "white !important",
                  color: "#078989",

                  borderRadius: "50% !important",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                },
              ".css-n8417t-MuiSvgIcon-root-MuiPaginationItem-icon": {
                color: "#078989",
                fontSize: "2rem",
              },
              zIndex: "10",
            }}
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(filteredJobs.length / exercisePerPage)}
            page={curPage}
            size="large"
            onChange={paginate}
          ></Pagination>
        )}
      </Stack>
    </Box>
  );
};

export default CourseList;
