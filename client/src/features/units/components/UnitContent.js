import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Divider,
  FormControl,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUnits, getAllUnits } from "../actions/units.js";
import { getCourses } from "../../courses/actions/courses.js";
import HelperText from "../../../components/HelperText.js";
import Select from "@mui/material/Select";
import UnitForm from "./UnitForm.js";
import UnitMore from "./UnitMore.js";

const UnitContent = () => {
  const { courses, units } = useSelector((state) => state.courses);

  useEffect(() => {
    if (!courses || !units) {
      dispatch(getCourses());
      dispatch(getAllUnits());
    }
  }, []);

  // const { units } = useSelector((state) => state.courseDetail);

  const [selectedCourseId,setselectedCourseId ] = useState(courses[0]?.id);

  const [courseUnits, setcourseUnits] = useState(
    units.filter((unit) => unit?.courseId === selectedCourseId)
  );
  const [openUnitForm, setOpenUnitForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [selectedUnit, setSelectedUnit] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setcourseUnits(units.filter((unit) => unit?.courseId === selectedCourseId));
  }, [units, selectedCourseId]);

  const handleCourseChange = (courseId) => {
    setselectedCourseId(courseId);
  };

  return (
    <Stack sx={{ padding: { xs: "20px", md: "50px" } }}>
      <Stack sx={{ flexDirection: "row", position: "relative" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "22px", sm: "27px", md: "32px" },
            fontWeight: "bold",
          }}
        >
          Unit
        </Typography>
        <Button
          onClick={() => setOpenUnitForm(true)}
          sx={{
            width: "40px",
            background: "#20839e",
            color: "white",
            position: "absolute",
            right: "0px",
            padding: "6px 40px !important",
            "&:hover": {
              background: "#20839e",
            },
          }}
        >
          <AddIcon /> ADD
        </Button>
      </Stack>
      <Divider />

      <Stack sx={{ gap: "20px", margin: "20px 0" }}>
        {/* email field start */}
        <Stack>
          <HelperText text="Course" />
          <FormControl fullWidth>
            <Select
              displayEmpty
              id="demo-simple-select"
              value={selectedCourseId}
              defaultValue={courses?.[0]?.id}
              onChange={(event) => {
                // dispatch(getUnits(event.target.value));
                handleCourseChange(event.target.value);
                setSelectedUnit("");
              }}
              sx={{
                background: "#f6f9fa",
                border: "none !important",
                mt: "15px",
              }}
            >
              {courses
                ? courses?.map((course, index) => {
                    return (
                      <MenuItem value={course?.id} key={index}>
                        {course?.title}
                      </MenuItem>
                    );
                  })
                : ""}
            </Select>
          </FormControl>
        </Stack>

        <Stack>
          <HelperText text="Units" />
          <Stack sx={{ flexDirection: "row", position: "relative" }}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                id="demo-simple-select"
                value={selectedUnit}
                onChange={(event) => {
                  setSelectedUnit(event.target.value);
                  setOpenUnitForm(false);
                }}
                sx={{
                  background: "#f6f9fa",
                  border: "none !important",
                  mt: "15px",
                }}
              >
                {courseUnits
                  ? courseUnits?.map((unit, index) => {
                      return (
                        <MenuItem value={unit} key={index}>
                          {unit?.title}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
            {selectedUnit ? (
              <UnitMore
                setIsUpdate={setIsUpdate}
                unit={selectedUnit}
                setOpenUnitForm={setOpenUnitForm}
                setSelectedUnit={setSelectedUnit}
              />
            ) : (
              ""
            )}
          </Stack>
        </Stack>

        {openUnitForm ? (
          <UnitForm
            setIsUpdate={setIsUpdate}
            courseId={selectedCourseId}
            setOpenUnitForm={setOpenUnitForm}
            unit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            isUpdate={isUpdate}
          />
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default UnitContent;
