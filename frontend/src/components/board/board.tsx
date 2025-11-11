/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
//import "./Main.css";
import {Button, Typography, Modal, Box, TextField, IconButton} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import { Stack } from "@mui/material";
import Column from "../column/Column";
import { Add } from "@mui/icons-material";

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

function Board() {
  const params = useParams()
  // console.log(params)
  // state holding board info for the user
  const [board, setBoard] = useState<Record<string, unknown>>({});

  const [columns, setColumns ] = useState<Record<string, unknown>[]>([])

  // new Board states
  const [modalColumnOpen, setModalColumnOpen] = useState<boolean>(false);
  const openColumnModal = () => setModalColumnOpen(true);
  const closeColumnModal = () => setModalColumnOpen(false);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");

  useEffect(() => {

    async function getCurrBoardInfo() {
      try {
        // get the ids of all the boards teh user is part of
        const response = await axios.get(`/api/board/${params.board_id}`);
        const data = await response.data;
        setBoard(data)
        console.log('board has been set')
        console.log(board)
        // with the ids then proceed to get the board information
        const newColumns: any = []
        await Promise.all(data.map(async (d: any)=>{
           const responseBoard = await axios.get(`/api/column/${d}`)
           const nData = await responseBoard.data
           newColumns.push(await nData)
        }))

        setColumns(newColumns)
        console.log('columns have been set')
        console.log(columns)
      } catch (error) {
        console.log(error);
      }
    }

    // if (boards.length == 0) {
    //   getUserBoards(); // call it if we dont have any boards loaded yet
    // }

    getCurrBoardInfo()

    // cant have a blank thingimajig, maaan
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calls the backend with a new column to save/create it
  async function createNewColumn() {
    const response = await axios.post(`/api/column`, {
      board_id: board.id,
      title: newColumnTitle
    });
    console.log(response);
    if(response.status == 200){
      const data = await response.data
      setColumns([...columns, {id: data.id, board_id: data.board_id, title: data.title}])
    }
  }

  return (
    <>
      <Stack direction={'row'} spacing={4}>
        {columns.map((column) => <>
          <Column column={column as {id: number, board_id: number, title: string}}></Column>
        </>)}
        <IconButton onClick={openColumnModal}><Add></Add></IconButton>
      </Stack>
      <Modal
        open={modalColumnOpen}
        onClose={closeColumnModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new Column
            </Typography>
            <TextField
              id="new-board-title"
              label="Title"
              variant="outlined"
              value={newColumnTitle}
              onChange={(event) => {
                setNewColumnTitle(event.target.value);
              }}
              />
            <Button variant="outlined" onClick={createNewColumn}>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Board;
