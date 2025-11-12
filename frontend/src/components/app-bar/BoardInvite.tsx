import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Typography } from "@mui/material";

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

export default function BoardInvite({
  invite
}: {
  invite: (email: string, addOrRemove: boolean) => Promise<void>;
}) {
  const [email, setEmail] = useState("");

  return (
    <Box sx={modalStyle}>
      <Stack spacing={2}>
        <Typography variant="h3" gutterBottom>
          Invite to Board
        </Typography>
        <TextField
          required
          id="board-invite-email"
          label="Email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-evenly", alignItems: "center" }}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              invite(email, true);
            }}
          >
            Invite
          </Button>
          <Button size="large" variant="outlined" onClick={()=>{ invite(email, false)}} color="error">
            Remove
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
