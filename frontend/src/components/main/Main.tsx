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

function Main() {

  const [boards, setBoards] = useState<Record<string, unknown>[]>([]);
  const [newModalOpen, setNewModalOpen] = useState<boolean>(false);
  const handleOpen = () => setNewModalOpen(true);
  const handleClose = () => setNewModalOpen(false);
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");

  const user = sessionStorage.getItem("user");
  if(user === null){
      console.log('user not Logged in')
      // kick user back to login site
  }

  useEffect(() => {
    async function getUserBoards() {
      try {
        const response = await axios.get(`/api/board/user/${user}`);
        console.log(response);
        const data = await response.data;
        console.log(data);
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
      getUserBoards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createNewBoard() {
    const response = await axios.post(`/api/board`, {
      owner_id: user,
      title: newBoardTitle
    });
    console.log(response);
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
                  <CardActionArea>
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
        <Box>
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
          <Button onClick={createNewBoard}>Create</Button>
        </Box>
      </Modal>
    </>
  );
}

export default Main;
