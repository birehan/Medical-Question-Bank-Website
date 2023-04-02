import * as React from "react";
import {
  Stack,
  Box,
  MenuList,
  Paper,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import HelperText from "../../../components/HelperText";

export default function UnitFilter({ units, setfilterUnit, filterUnit }) {
  return (
    <Stack
      className="filter-container"
      sx={{
        gap: "30px",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: "2rem" }}>Filters</Typography>
        <Button
          sx={{
            color: "#20839e",
          }}
          onClick={() => setfilterUnit("")}
        >
          Clear
        </Button>
      </Stack>
      {/* <CourseSelector /> */}
      <Stack className="unit-content" sx={{ flex: 1, overflow: "auto" }}>
        <HelperText text="Filter By Unit" />

        <Box
          sx={{
            maxWidth: "100%",
            mt: "40px",
            width: "98%",
            border: "2px solid #f6f9fa",
            overflow: "auto",
            background: "white",
          }}
        >
          <MenuList
            className="unit-content"
            sx={{
              padding: "0 !important",
            }}
          >
            {units && units?.length
              ? units?.map((unit, index) => (
                  <Stack
                    key={index}
                    onClick={() => setfilterUnit(unit?.id)}
                    sx={{
                      background:
                        parseInt(filterUnit) == unit?.id
                          ? "#29d4dd !important"
                          : "",
                      // border: "1px solid red",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "12px 20px",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography>{unit?.title}</Typography>
                    </Box>
                    <Divider />
                  </Stack>
                ))
              : ""}
          </MenuList>
        </Box>
      </Stack>
    </Stack>
  );
}
