import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router';

export default function WelcomePage(){
  return(
    <Box 
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="90vh">
      <Stack>
        <Typography variant='h1' gutterBottom>Maet</Typography>
        <Button variant='outlined' component={NavLink} to='/login'>login</Button>
      </Stack>
    </Box>
  )
}
