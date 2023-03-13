import React,{useState,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../images/cakelogo.svg";
import gecko from "../images/coingecko.png";
import reactpic from "../images/react.png";
import profilepic from "../images/profilepic.jpg";
import { Typography, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"IBM Plex Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeight: 10000,
    fontSize: 20,
  },
});

export default function NavBar() {

  /*
==============================================================================
To make the website mobile responsive we check the current size of the page
and adjust the elements on the navbar accordingly
==============================================================================
*/

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 550);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <AppBar position="sticky" style={{ background: "#FFFFFF" }}>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 64,
            marginLeft: -1,
            marginRight: "auto", // This property will push the logo to the left.
          }}
          alt="Your logo."
          src={Logo}
        />
        {!isSmall && (
          <ThemeProvider theme={theme}>
            <Typography variant="h6" color="black" sx={{ mr: 2 }}>
              Powered By
            </Typography>
          </ThemeProvider>
        )}
        <Box
          component="img"
          sx={{
            height: 45,
          }}
          alt="Your logo."
          src={gecko}
          style={{
            display: "flex",
            marginRight: 3,
            justifyContent: "flex-end",
          }}
        />
        <Box
          component="img"
          sx={{
            height: 45,
          }}
          alt="Your logo."
          src={reactpic}
          style={{
            display: "flex",
            marginRight: 3,
            justifyContent: "flex-end",
          }}
        />
        <a href="https://www.linkedin.com/in/liam-ayathan-046b3816b/">
          <Box
            component="img"
            sx={{
              height: 45,
              borderRadius: "50%",
            }}
            alt="Your logo."
            src={profilepic}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: -10,
            }}
          />
        </a>
      </Toolbar>
    </AppBar>
  );
}
