import React from "react";
import { Box, Input, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { searchJobs } from "../features/jobs/actions/jobs";
import { useNavigate } from "react-router-dom";
import useStyles from "./Style";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ handleSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={useStyles.searchContainer}>
      <Input
        className="search-bar"
        title="search"
        disableUnderline={true}
        type={"search"}
        sx={useStyles.searchField}
        placeholder="Search a course"
        name="search"
        variant="outlined"
        id="outlined-basic search"
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />

      <SearchIcon title="search" type="submit" sx={useStyles.searchButton} />
    </Box>
  );
};

export default Search;
