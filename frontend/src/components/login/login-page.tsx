
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

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
    axios.post(`/api/user/verify`, {
      email: email,
      password: password
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
        username: username,
        email: email,
        password: password
    }
    ).then((res) => res.data).then((data) => {
      if(data){
        sessionStorage.setItem('user', data.id)
        navigate('/main')
      }
    })
  }

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="90vh">
      {!isSignup ? 
      <div>
        <Grid container spacing={2} maxWidth="sm">
          <Stack spacing={2}>
            <Typography variant='h2' gutterBottom>Login</Typography>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
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
            </Box>
            <Stack direction="row" spacing={2} sx={{justifyContent: "space-evenly", alignItems: "center"}}>
              <Button size='large' variant="outlined" onClick={loginUser}>login</Button>
              <Button size='large' variant="outlined" onClick={() => setIsSignup(true)}>sign up?</Button>
            </Stack>
            
          </Stack>
        </Grid>
      </div> 
      :
      <div>
        <Grid container spacing={2}>
          <Stack spacing={2}>
            <Typography variant='h2' gutterBottom>Sign up</Typography>
            <Box
              component="form"
              sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
              noValidate
              autoComplete="off"
            >
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
            </Box>
            <Stack direction="row" spacing={2} sx={{justifyContent: "space-evenly", alignItems: "center"}}>
            <Button size='large' variant="outlined" onClick={signupUser}>sign up</Button>
            <Button size='large' variant="outlined" onClick={() => setIsSignup(false)}>back</Button>
            </Stack>
          </Stack>
        </Grid>
      </div>
      }
  </Box>
  );
}
