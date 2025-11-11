/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Modal, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from '@mui/icons-material'
import Profile from "../profile/Profile";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function Appbar() {

  const navigate = useNavigate()
  // check if the user is logged in
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, setUser] = useState('') // sessionStorage.getItem("user");
  const params = useParams()

  const [board, setBoard] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [newModalOpen, setNewModalOpen] = useState(false)
  const profileClose = () => {setNewModalOpen(false)}
  const profileOpen = () => {setNewModalOpen(true)}

  useEffect(()=> {
    const userCheck = sessionStorage.getItem("user")
    if(userCheck){
      setUser(userCheck)
      console.log('user is logged in')
    } else {
      console.log('user not logged in')
      navigate('/')
      return
    }

    

    console.log('useEffect')
    console.log(params)
    async function getCurrBoardInfo() {
      console.log('appbar: getting board info')
      try {
        // get the ids of all the boards teh user is part of
        const response = await axios.get(`/api/board/${params.board_id}`);
        const data = await response.data;
        setBoard(data)
        console.log('board has been set inside app bar')
      } catch (error) {
        console.log('appbar: board: error')
        console.log(error);
      }
    }

    if(params.board_id != undefined){
      getCurrBoardInfo()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{flexGrow: 1}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {board ? board.title : 'Boards'}
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose(); profileOpen()}}>Profile</MenuItem>
                <MenuItem onClick={() => {handleClose(); navigate('/')}}>Log out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Modal
        open={newModalOpen}
        onClose={profileClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Profile></Profile>
      </Modal>
    </>
  );
}

export default Appbar;
