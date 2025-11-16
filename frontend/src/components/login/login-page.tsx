import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  const [gdpr, setGdpr] = useState(false)


  const [usernameError, setUsernameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [gdprError, setGdprError] = useState(false)


  useEffect(()=> {
    setUsername("")
    setPassword("")
    setEmail("")
    setGdpr(false)
  }, [isSignup])

  // logs the user in by sending a get to the api,
  // checking if the email and password match and are part of the same account
  // then sending us out to /main
  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("logging in")
    if(emailError && passwordError){
      console.log("not valid")
      return
    }
    axios
      .post(`/api/user/verify`, {
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          sessionStorage.setItem("user", data.id);
          navigate("/main");
        }
      });
  }

  function isValidForm(): boolean{
    if(gdpr && !usernameError && !emailError && !passwordError){
      return true
    }
    return false
  }

  // signs up a new user
  // saves the new users id locally
  // then sends us out to /main
  function signupUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("signing up")
    if(!isValidForm()){
      console.log("not valid")
      return
    }
    axios
      .post(`/api/user`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          sessionStorage.setItem("user", data.id);
          navigate("/main");
        }
      });
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      {!isSignup ? (
        <div>
          <Grid container spacing={2} maxWidth="sm">
            <Stack spacing={2}>
              <Typography variant="h2" gutterBottom>
                Login
              </Typography>
              <form onSubmit={loginUser}>

              <FormControl>
                <FormGroup>
                  <TextField
                    required
                    id="outlined-required"
                    label="email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value); setEmailError(email.length < 7)}}
                    sx={{
                      maxWidth: "40ch",
                      minWidth: "35ch",
                      marginTop: "1rem",
                    }}
                    error={emailError}

                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value); setPasswordError(password.length < 5)}}
                    sx={{
                      maxWidth: "40ch",
                      minWidth: "35ch",
                      marginTop: "1rem",
                    }}
                    error={passwordError}
                  />
                </FormGroup>
              </FormControl>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-evenly", alignItems: "center", marginTop: ".5rem"}}
              >
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up?
                </Button>
                <Button type="submit" size="large" variant="outlined">
                  Log In
                </Button>
              </Stack>
              </form>
            </Stack>
          </Grid>
        </div>
      ) : (
        <div>
          <Grid container spacing={2}>
            <Stack spacing={2}>
              <Typography variant="h2" gutterBottom>
                Sign up
              </Typography>
              <form onSubmit={signupUser}>

              <FormControl>
                <FormGroup>
                  <TextField
                    required
                    id="outlined-required"
                    label="username"
                    value={username}
                    onChange={(event) => {setUsername(event.target.value); setUsernameError(username.length < 5)}}
                    sx={{
                      maxWidth: "40ch",
                      minWidth: "35ch",
                      marginTop: "1rem",
                    }}
                    error={usernameError}
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value); setEmailError(email.length < 7)}}
                    sx={{
                      maxWidth: "40ch",
                      minWidth: "35ch",
                      marginTop: "1rem",
                    }}
                    error={emailError}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value); setPasswordError(password.length < 5)}}
                    sx={{
                      maxWidth: "40ch",
                      minWidth: "35ch",
                      marginTop: "1rem",
                    }}
                    error={passwordError}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    required
                    control={<Checkbox checked={gdpr} onChange={(event)=>{setGdpr(event.target.checked); setGdprError(!gdpr)}} />}
                    label="You consent to us saving your personal data in conjunction to our privacy policy"
                    sx={{maxWidth: "40ch"}}
                  />
                  <FormHelperText error={!gdprError}>You must consent to sign up</FormHelperText>
                  <NavLink to={'/privacy'}>Privacy Policy</NavLink>
                </FormGroup>
              </FormControl>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-evenly", alignItems: "center", marginTop: ".5rem"}}
              >
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => setIsSignup(false)}
                >
                  back
                </Button>
                <Button type="submit" size="large" variant="outlined">
                  sign up
                </Button>
              </Stack>
              </form>
            </Stack>
          </Grid>
        </div>
      )}
    </Box>
  );
}
