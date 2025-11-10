
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isSignup, setIsSignup] = useState(false)


  // logs the user in by sending a get to the api,
  // checking if the email and password match and are part of the same account
  // then sending us out to /main
  function loginUser() {
    axios.get(`/api/user/verify`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {
      email: email,
      password: password
    }
    }).then((res) => res.data).then((data) => {
      if(data){
        sessionStorage.setItem('user', data.id)
        navigate('/main')
      }
    })
  }

  // signs up a new user
  // saves the new users id locally
  // then sends us out to /main
  function signupUser() {
        axios.post(`/api/user`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: username,
        email: email,
        password: password
    }
    }).then((res) => res.data).then((data) => {
      if(data){
        sessionStorage.setItem('user', data.id)
        navigate('/main')
      }
    })
  }

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      {!isSignup ? 
      <div>
        <Grid container spacing={2}>
          <Stack spacing={2}>
            <h1 className="text-3xl font-bold text-black">Login</h1>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="email"
                onChange={(event) => setEmail(event.target.value)}
                />
            </Grid>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                />
            </Grid>
            <Button variant="outlined" onClick={loginUser}>login</Button>
            <Button variant="outlined" onClick={() => setIsSignup(true)}>signup?</Button>
          </Stack>
        </Grid>
      </div> 
      :
      <div>
        <Grid container spacing={2}>
          <Stack spacing={2}>
            <h1 className="text-3xl font-bold text-black">Signup</h1>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="username"
                onChange={(event) => setUsername(event.target.value)}
                />
            </Grid>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="email"
                onChange={(event) => setEmail(event.target.value)}
                />
            </Grid>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                />
            </Grid>
            <Button variant="outlined" onClick={signupUser}>signup</Button>
            <Button variant="outlined" onClick={() => setIsSignup(false)}>back</Button>
          </Stack>
        </Grid>
      </div>
      }
    </Box>
  );
}
