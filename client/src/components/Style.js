const useStyles = {
  searchContainer: {
    position: "relative",
    width: {
      xs: "100% !important",
      md: "50vw !important",
      lg: "35vw !important",
    },
    margin: "30px auto 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchField: {
    background: "white !important",
    width: {
      xs: "100% !important",

      md: "50vw !important",
      lg: "35vw !important",
    },
    borderRadius: "10px",
    padding: "10px 50px 10px 20px",
    // border: "1px solid silver",
  },
  searchButton: {
    position: "absolute",
    right: { xs: "30px", sm: "20px" },
    // background: "#4d99b6",

    borderRadius: "0px 25px 25px 0px !important",
    textTransform: "capitalize",
    "&:hover": {
      cursor: "pointer",
      color: "#078989",
      // background: "#6fc2e3",
    },
    fontSize: "1.6rem",
    color: "black",
    top: "12px",
    display: "flex",
  },

  profileMenuStyle: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
    fontFamily: "poppins",
  },
  profileAvatorStyle: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    bottom: "0",
    margin: "auto",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 30px 10px",
    gap: "5px",
    width: "150px",
    fontFamily: "poppins",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "grey",
  },
  jobFitLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    textDecoration: "none",
  },
  headerContent: {
    display: "flex",
    color: "black",
    flex: { md: "0.85", lg: "0.8" },
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLinks: {
    color: "black",
    fontSize: { lg: "27px", md: "22px" },
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#4d99b6",
      transition: "300ms all ease-in",
    },
  },
  loginLinks: {
    color: "black",
    background: "#4d99b6",
    borderRadius: "70px",
    padding: "2px 30px",
    // fontSize: { lg: "18px", md: "16px" },

    "&:hover": {
      border: "1px solid #4d99b6",
      fontWeight: "bold",
      transition: "300ms all ease-in",
    },
  },
  headerLinks: {
    fontFamily: "Inter",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "29px",
    color: "#263238",
    "&:hover": {
      cursor: "pointer",
      color: "#039198",
      transition: "400ms all ease-in",
    },
  },
};

export default useStyles;
