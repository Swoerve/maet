/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, Home, PersonAdd, Settings } from "@mui/icons-material";
import Profile from "../profile/Profile";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import BoardSettings from "./BoardSettings";
import BoardInvite from "./BoardInvite";

function Appbar() {
  const navigate = useNavigate();
  // check if the user is logged in
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, setUser] = useState(""); // sessionStorage.getItem("user");
  const params = useParams();

  const [board, setBoard] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [newModalOpen, setNewModalOpen] = useState(false);
  const profileClose = () => {
    setNewModalOpen(false);
  };
  const profileOpen = () => {
    setNewModalOpen(true);
  };

  const [boardSettingsModal, setBoardSettingsModal] = useState(false);
  const boardSettingsClose = () => {
    setBoardSettingsModal(false);
  };
  const boardSettingsOpen = () => {
    setBoardSettingsModal(true);
  };

  const [boardInviteModal, setBoardInviteModal] = useState(false);
  const boardInviteClose = () => {
    setBoardInviteModal(false);
  };
  const boardInviteOpen = () => {
    setBoardInviteModal(true);
  };

  useEffect(() => {
    const userCheck = sessionStorage.getItem("user");
    if (userCheck) {
      setUser(userCheck);
      console.log("user is logged in");
    } else {
      console.log("user not logged in");
      navigate("/");
      return;
    }

    console.log("useEffect");
    console.log(params);
    async function getCurrBoardInfo() {
      console.log("appbar: getting board info");
      try {
        // get the ids of all the boards teh user is part of
        const response = await axios.get(`/api/board/${params.board_id}`);
        const data = await response.data;
        setBoard(data);
        console.log("board has been set inside app bar");
      } catch (error) {
        console.log("appbar: board: error");
        console.log(error);
      }
    }

    if (params.board_id != undefined) {
      getCurrBoardInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function deleteBoard() {
    const response = await axios.delete(`/api/board/${board.id}`);
    console.log(response);
    if (response.status == 200) {
      navigate("/main");
      setBoard(null)
    }
    boardSettingsClose()
  }

  async function editBoard(title: string) {

    const response = await axios.patch(`/api/board/${board.id}`, {
      title: title,
    });
    if(response.status == 200){
      setBoard({...board, title: title})
    }
    boardSettingsClose()
  }

  async function inviteByEmail(email: string, addOrRemove: boolean) {
    if(addOrRemove){
      await inviteByEmailTrue(email)
    } else {
      await inviteByEmailFalse(email)
    }
    boardSettingsClose()
  }

  async function inviteByEmailTrue(email: string) {
    const response = await axios.post(`/api/user/email`, {
      email: email,
    });
    if(response.status == 200){
      const data = await response.data

      const response2 = await axios.post(`/api/board/join`, {
        user_id: data.id,
        board_id: board.id,
        is_owner: false
      })

      if(response2.status == 200){
        console.log('added user connection to board')
      }
    }
  }

  async function inviteByEmailFalse(email: string) {
    const response = await axios.post(`/api/user/email`, {
      email: email,
    });
    if(response.status == 200){
      const data = await response.data

      const response2 = await axios.delete(`/api/board/join`, {
        data: {
          user_id: data.id,
          board_id: board.id
        }
      })

      if(response2.status == 200){
        console.log('deleted user connection to board')
      }
    }
  }

  return (
    <>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
          <IconButton
            onClick={() => {
              navigate("/main");
              setBoard(null)
            }}
          >
            <Home />
          </IconButton>
          
            {board 
            ? 
            <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {board.title}
            </Typography>
            <IconButton onClick={boardSettingsOpen}><Settings /></IconButton>
            <IconButton onClick={boardInviteOpen}><PersonAdd /></IconButton>
            </>
            : "Boards"}
          </Stack>
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
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  profileOpen();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/");
                }}
              >
                Log out
              </MenuItem>
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
      {board &&
      
      <>
      <Modal
          open={boardSettingsModal}
          onClose={boardSettingsClose}
          aria-labelledby="board settings"
          aria-describedby="a modal that shows board settings"
        >
          <BoardSettings edit={editBoard} del={deleteBoard} current_title={board.title}></BoardSettings>
        </Modal><Modal
          open={boardInviteModal}
          onClose={boardInviteClose}
          aria-labelledby="board settings"
          aria-describedby="a modal that shows board settings"
        >
            <BoardInvite invite={inviteByEmail}></BoardInvite>
          </Modal>
          </>
      }
    </>
  );
}

export default Appbar;
