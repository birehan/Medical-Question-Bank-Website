import React, { useEffect } from "react";
import { Box } from "@mui/material";

const RightMark = ({ showAnimation, setShowAnimation, isCorrect }) => {
  useEffect(() => {
    if (showAnimation) {
      setShowAnimation(true);
      const timeoutId = setTimeout(() => setShowAnimation(false), 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [showAnimation]);

  return (
    <Box
      // style={{ marginLeft: "20px" }}
      sx={{
        position: "absolute",
        right: { xs: "0px", md: "-35px" },
        // margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {showAnimation && isCorrect ? (
        <svg
          viewBox="0 0 52 52"
          width="35px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            style={{
              stroke: isCorrect ? "green" : "#ff3b30",
            }}
            className="circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark"
            fill="none"
            d="M14,27l7.6,7.6c0.6,0.6,1.6,0.6,2.2,0l18.2-18.2"
          />
        </svg>
      ) : showAnimation && !isCorrect ? (
        <svg
          viewBox="0 0 52 52"
          width="35px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            style={{
              stroke: isCorrect ? "green" : "#ff3b30",
            }}
            className="circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="wrong-x"
            fill="none"
            d="M16,16 L36,36 M36,16 L16,36"
          />
        </svg>
      ) : (
        ""
      )}
    </Box>
  );
};

export default RightMark;
