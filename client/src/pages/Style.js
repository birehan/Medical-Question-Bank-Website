import styled from "@emotion/styled";

const useStyles = styled({
  homepage: {
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
  },
  homeContent: {
    // flex: "1",
    flexDirection: { xs: "column-reverse", md: "row" },
    width: { xs: "95vw", lg: "80vw" },
    height: { xs: "fit-content", md: "60vh" },
    margin: { xs: "80px auto 20px", lg: "80px auto 70px" },
    // border: "3px solid green",
    gap: "20px",
  },
  homeTextContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  homeTextCotent: {
    justifyContent: "center",
    alignItems: "start",
    margin: { xs: "0px 30px 30px", md: "0px" },
    gap: "30px",
  },
  medicalText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: { xs: "32px", md: "34px", lg: "42px" },
    lineHeight: "160.9%",
    letterSpacing: "0.01em",
    color: "#00b5be",
  },
  detailText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
    lineHeight: "169.4%",
    /* or 77px */

    letterSpacing: "0.07em",

    color: "black",
    // width: { xs: "90%", sm: "80%", md: "90%", lg: "70%" },
  },
  getStartButton: {
    border: "2px solid #00B5BE",
    borderRadius: "5px",
    textTransform: "capitalize",
    color: "black",
    fontSize: "24px",
    padding: "20px 30px !important",
    height: "40px",
    "&:hover": {
      color: "#018890",

      transition: "400ms all ease-in",
      background: "transparent",
    },
    zIndex: "5",
  },
  getStartDot: {
    position: "absolute",
    left: "-20px",
    width: "30px",
    top: "5px",
  },
  bottomCurve: {
    position: "absolute",
    display: {
      xs: "none",
      md: "flex",
      bottom: "0",
      left: "0",
      right: "0",
      margin: "0 auto",
    },
  },
  homeImageContainer: {
    flex: { xs: "5", sm: "0", md: "5", lg: "6" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeImageContent: {
    width: { xs: "100vw", sm: "70vw", md: "100%" },
    display: "flex",
    justifyContent: { xs: "center", md: "start" },
    alignItems: "center",
    margin: { xs: "30px 30px 0", md: "0px" },
  },
  homeImage: {
    objectFit: "contain",
    width: { xs: "90%", sm: "90%", md: "90%", lg: "600px" },
    height: "100%",
    margin: { xs: "30px 0px", md: "0" },
  },
});

export default useStyles;
