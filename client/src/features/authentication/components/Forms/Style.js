const useStyles = {
  helperText: {
    mb: "-15px",
    fontSize: "16px",
    color: "#1e5f78",
    opacity: "1",
    fontWeight: "bold",
  },
  textFieldStyle: { mb: "15px !important" },
  submitButtonStyle: {
    width: "100%",
    // background: "#26acd1",
    background: "#0EAFAF",

    color: "white",
    fontWeight: "bold",
    m: "20px auto 0",
    fontSize: "1.05rem",
    "&:hover": {
      background: "#078989",
      transition: "400ms all easy-in",
    },
    display: "flex",
    padding: "8px 20px !important",
  },
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  signupCard: {
    width: { xs: "70vw", sm: "380px", md: "400px", lg: "440px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px",
    padding: "50px",
    gap: "15px",
    // border: "1px solid 20839e#",
    border: "1px solid silver",
  },
  googleButton: {
    width: "100%",
    backgroundColor: "#4285F4",
    color: "#FFFFFF",
    fontSize: "16px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1.05rem",
    "&:hover": {
      opacity: "0.8",
      backgroundColor: "#4285F4",
      transition: "400ms all easy-in",
    },
  },
  textService: {
    color: "#1e5f78",
    opacity: "1",
    fontWeight: "bold",
    cursor: "pointer",
  },
  orSignupText: {
    color: "black",
    opacity: "0.6",
  },
  heartAvator: {
    background: "#f3f6f6",
    height: "40px",
    width: "40px",
    padding: "20px",
    color: "white",
    border: "1px solid silver",
  },
  loginText: {
    color: "#20839e",
    fontWeight: "bold",
    opacity: "0.8",
    "&:hover": {
      cursor: "pointer",
      opacity: "1",
    },
  },
};

export default useStyles;
