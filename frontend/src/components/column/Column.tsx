/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
//import "./Main.css";
import {Button, Typography, Modal, Box, TextField, IconButton} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { PlusOneRounded, Add } from "@mui/icons-material"

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Column({column}) {
  const params = useParams()
  console.log(params)

  const [tasks, setTasks ] = useState<Record<string, unknown>[]>([])
  
  return (
    <>
      <Stack spacing={2}>
        <p>Hello</p>
        <p>World</p>
      </Stack>
    </>
  );
}

export default Column;
