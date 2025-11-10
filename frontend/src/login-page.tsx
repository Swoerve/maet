//import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Grid container spacing={2}>
          <Stack spacing={2}>
            <h1 className="text-3xl font-bold text-black">Title</h1>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="email"
                />
            </Grid>
            <Grid size={3}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                />
            </Grid>
            <Button variant="outlined">login</Button>
          </Stack>
        </Grid>
      </div>
    </Box>
  );
}