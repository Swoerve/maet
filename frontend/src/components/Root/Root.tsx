import { Outlet } from "react-router";

import Appbar from "../app-bar/AppBar";
import { Box } from "@mui/material";

function Root() {
  return (
    <>
      <Appbar></Appbar>

      <Box 
      component="main" 
      sx={{ p: 2, paddingTop: 4 }}
      display="flex"
      height="90vh"
      width="100dvw"
      overflow="scroll"
      justifyContent="space-between"
    >
        <Outlet></Outlet>
      </Box>
    </>
  );
}

export default Root;
