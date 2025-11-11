/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router";

import Appbar from "../app-bar/AppBar";

function Root() {

  return (
    <>
        <Appbar></Appbar>
        <Outlet></Outlet>
    </>
  );
}

export default Root;
