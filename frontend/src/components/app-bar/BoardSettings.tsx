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

export default function BoardSettings({
  edit,
  del,
  current_title
}: {
  edit: (title: string) => Promise<void>;
  del: () => Promise<void>;
  current_title: string;
}) {
  const [title, setTitle] = useState(current_title);

  return (
    <Box sx={modalStyle}>
      <Stack spacing={2}>
        <Typography variant="h3" gutterBottom>
          Edit Board
        </Typography>
        <TextField
          required
          id="board-title"
          label="Title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
              edit(title);
            }}
          >
            Edit
          </Button>
          <Button size="large" variant="outlined" onClick={del} color="error">
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
