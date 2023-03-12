import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        alignItems: "center",
      }}
    >
      <PropagateLoader
        color="#4d99b6"
        loading
        size={25}
        speedMultiplier={0.7}
      />
      <Typography sx={{ mt: "100px", color: "#1e5f78", fontSize: "1.3rem" }}>
        Loading
      </Typography>
    </Box>
  );
};
export default Loading;
