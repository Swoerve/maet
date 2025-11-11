import { Outlet } from "react-router";

import Appbar from "../app-bar/AppBar";
import { Box } from "@mui/material";

function Root() {
  return (
    <>
      <Appbar></Appbar>

      <Box component="main" sx={{ p: 2, paddingTop: 4 }}>
        <Outlet></Outlet>
      </Box>
    </>
  );
}

export default Root;
