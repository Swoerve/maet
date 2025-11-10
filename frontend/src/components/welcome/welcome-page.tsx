import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack';

export default function WelcomePage(){
  return(
    <div>
      <Stack>
        <h1 className="text-3xl font-bold text-black">Title</h1>
          <Link href="/login">
            <Button variant="outlined">login</Button> 
          </Link>
      </Stack>
    </div>
  )
}