import React from "react";
import { Box, Input } from "@mui/material";
import useStyles from "./Style";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ handleSearch, helperText }) => {
  return (
    <Box sx={useStyles.searchContainer}>
      <Input
        className="search-bar"
        title="search"
        disableUnderline={true}
        type={"search"}
        sx={useStyles.searchField}
        placeholder={helperText}
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
