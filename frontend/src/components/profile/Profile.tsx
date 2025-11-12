import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from 'react-router';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = sessionStorage.getItem("user");

  useEffect(() => {
    let loadedUserInfo = false;

    async function getUser() {
      //console.log("getting user info");
      const response = await axios.get(`/api/user/${user}`);
      const data = await response.data;
      //console.log(response)
      //console.log(data)
      setUsername(data.username);
      setEmail(data.email);
    }

    if (!loadedUserInfo) {
      getUser();
      loadedUserInfo = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editUser() {
    axios
      .patch(`/api/user/${user}`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          console.log("editing user")
          sessionStorage.setItem("user", data.id);
          //navigate('/main')
        }
      });
  }

  function deleteUser() {
    axios
      .delete(`/api/user/${user}`)
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          console.log("deleting user")
          sessionStorage.removeItem("user");
          navigate('/')
        }
      });
  }

  return (
    <Box sx={modalStyle}>
      <Stack spacing={2}>
        <Typography variant="h3" gutterBottom>
          Edit any user account properties?
        </Typography>
          <p>{username}</p>
          <TextField
            required
            id="outlined-required"
            label="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <p>{email}</p>
          <TextField
            required
            id="outlined-required"
            label="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly", alignItems: "center" }}
        >
          <Button size="large" variant="outlined" onClick={editUser}>
            Send Changes
          </Button>
          <Button size="large" variant="outlined" onClick={deleteUser}>
            delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
