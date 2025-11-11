/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Modal, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from '@mui/icons-material'
import Profile from "../profile/Profile";

function Appbar() {
  // check if the user is logged in
  //const user = sessionStorage.getItem("user");

  const [board, _setBoard] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [newModalOpen, setNewModalOpen] = useState(false)
  const profileClose = () => {setNewModalOpen(false)}
  const profileOpen = () => {setNewModalOpen(true)}

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
            {board ? board.name : 'Boards'}
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
                <MenuItem onClick={() => {handleClose();}}>Log out</MenuItem>
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
