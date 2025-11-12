/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./Main.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router";
import { Stack } from "@mui/material";

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

function Main() {

  // state holding board info for the user
  const [boards, setBoards] = useState<Record<string, unknown>[]>([]);

  // new Board states
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const handleOpen = () => setNewModalOpen(true);
  const handleClose = () => {
    setNewModalOpen(false)
    setNewBoardTitle("")
  };
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");

  const navigate = useNavigate()

  // check if the user is logged in
  const user = sessionStorage.getItem("user");
  

  useEffect(() => {

    if(user === null){
      console.log('user not Logged in')
      // kick user back to login page
      navigate('/login')
    }

    async function getUserBoards() {
      try {
        // get the ids of all the boards teh user is part of
        const response = await axios.get(`/api/board/user/${user}`);
        const data = await response.data;

        // with the ids then proceed to get the board information
        const newData: any = []
        await Promise.all(data.map(async (d: any)=>{
           const responseBoard = await axios.get(`/api/board/${d}`)
           const nData = await responseBoard.data
           newData.push(await nData)
        }))

        setBoards(newData)
        console.log('boards have been set')
      } catch (error) {
        console.log(error);
      }
    }

    if (boards.length == 0) {
      getUserBoards(); // call it if we dont have any boards loaded yet
    }

    // cant have a blank thingimajig, maaan
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // creates a new board
  async function createNewBoard() {
    const response = await axios.post(`/api/board`, {
      owner_id: user,
      title: newBoardTitle
    });
    console.log(response);
    if(response.status == 200){
      const data = await response.data
      setBoards([...boards, {id: data.id, owner_id: data.owner_id, title: data.title}])
    }
    handleClose()
  }

  return (
    <>
      { boards.length > 0 ?
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {boards.map((board, index) => (
            <>
              <Grid key={index}>
                <Card>
                  <CardActionArea onClick={() => {navigate(`board/${board.id}`)}}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {String(board.title)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      : null}
      
      <Button onClick={handleOpen}>New Board</Button>
      <Modal
        open={newModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new Board
            </Typography>
            <TextField
              id="new-board-title"
              label="Title"
              variant="outlined"
              value={newBoardTitle}
              onChange={(event) => {
                setNewBoardTitle(event.target.value);
              }}
              />
            <Button variant="outlined" onClick={createNewBoard}>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Main;
