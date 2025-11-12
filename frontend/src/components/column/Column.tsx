/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import { lazy } from "react";
const Task = lazy(() => import('../task/Task'))
import axios from "axios";
import { Add } from "@mui/icons-material";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Column({column }: {column: {id: number, board_id: number, title: string}}) {
  const params = useParams()
  console.log(params)

  const [tasks, setTasks ] = useState<Record<string, unknown>[]>([])
  // new Task states
  const [modalTaskOpen, setModalTaskOpen] = useState<boolean>(false);
  const openTaskModal = () => setModalTaskOpen(true);
  const closeTaskModal = () => setModalTaskOpen(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    async function getTasks(){
      const response = await axios.get(`/api/task/column/${column.id}`)
      const data = await response.data
      const newTasks: any[] = []
      await Promise.all(data.map((d: any) => {
        newTasks.push(d)
      }))
      setTasks(newTasks)
    }

    getTasks()
  })

    // calls the backend with a new column to save/create it
  async function createNewTask() {
    const response = await axios.post(`/api/column`, {
      column_id: column.id,
      title: newTaskTitle
    });
    console.log(response);
    if(response.status == 200){
      const data = await response.data
      setTasks([...tasks, {id: data.id, board_id: data.board_id, title: data.title}])
    }
  }

  async function editTask() {

  }

  async function deleteTask() {

  }

  async function moveTask() {

  }
  
  const taskUtils = {move: moveTask, edit: editTask, delete: deleteTask}

  return (
    <>
      <Stack spacing={1} minWidth={"20ch"}>
        <p>Hello</p>
        <p>{column.title}</p>
        <IconButton onClick={openTaskModal} size="large"><Add></Add></IconButton>
        {tasks.map((task) => <>
          <Task task={task as {id: number, column_id: number, title: string, description: string}} taskUtils={taskUtils}></Task>
        </>)}
      </Stack>
      <Modal
        open={modalTaskOpen}
        onClose={closeTaskModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new Column
            </Typography>
            <TextField
              id="new-task-title"
              label="Title"
              variant="outlined"
              value={newTaskTitle}
              onChange={(event) => {
                setNewTaskTitle(event.target.value);
              }}
              />
              <TextField
              id="new-task-description"
              label="Description"
              variant="outlined"
              value={newTaskDescription}
              onChange={(event) => {
                setNewTaskDescription(event.target.value);
              }}
              multiline
              minRows={3}
              />
            <Button variant="outlined" onClick={createNewTask}>Create</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Column;
