/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
//import { lazy } from "react";
//const Task = lazy(() => import('../task/Task'))
import Task from '../task/Task'
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";

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

function Column({column, deleteColumn }: {column: {id: number, board_id: number, title: string},deleteColumn:(id:number)=>Promise<void>}) {
  console.log(column)

  const [tasks, setTasks ] = useState<Record<string, unknown>[]>([])
  // new Task states
  const [modalTaskOpen, setModalTaskOpen] = useState<boolean>(false);
  const openTaskModal = () => setModalTaskOpen(true);
  const closeTaskModal = () => {
    setModalTaskOpen(false)
    setNewTaskTitle("")
    setNewTaskDescription("")
    setIsEditing(false)
    setTaskToBeEdited(null)
  };
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const [isEditing, setIsEditing] = useState(false)
  const [taskToBeEdited, setTaskToBeEdited] = useState<any>()

  useEffect(() => {
    async function getTasks(){
      console.log("getting tasks")
      const response = await axios.get(`/api/task/column/${column.id}`)
      const data = await response.data
      console.log(data)
      
      const newTasks: any[] = []
      await Promise.all(data.map( async (d: any) => {
        const taskResponse = await axios.get(`/api/task/${d}`)
        const taskData = taskResponse.data
        newTasks.push(taskData)
      }))
      setTasks(newTasks)
    }

    getTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    // calls the backend with a new column to save/create it
  async function createNewTask() {
    const response = await axios.post(`/api/task`, {
      column_id: column.id,
      title: newTaskTitle,
      description: newTaskDescription
    });
    console.log(response);
    if(response.status == 200){
      const data = await response.data
      setTasks([...tasks, {id: data.id, column_id: data.column_id, title: data.title, description: data.description}])
    }
    closeTaskModal()
  }

  async function startEditing(newTask: any) {
    setIsEditing(true)
    setTaskToBeEdited(newTask)
    setNewTaskTitle(newTask.title)
    setNewTaskDescription(newTask.description)
    openTaskModal()
  }

  async function editTask() {
    console.log('editing')
    console.log(taskToBeEdited)
    if(taskToBeEdited === undefined || taskToBeEdited === null){
      return
    }
    const response = await axios.patch(`/api/task/${taskToBeEdited.id}`, {
      column_id: taskToBeEdited.column_id,
      title: newTaskTitle,
      description: newTaskDescription
    });
    console.log(response);
    if(response.status == 200){
      const index = tasks.findIndex((task) => task.id === taskToBeEdited.id)
      const newTasks = tasks
      newTasks[index] = {id: taskToBeEdited.id, column_id: taskToBeEdited.column_id, title: newTaskTitle, description: newTaskDescription}
      setTasks(newTasks)
    }
    setIsEditing(false)
    setTaskToBeEdited(null)
    setNewTaskTitle("")
    setNewTaskDescription("")
    closeTaskModal()
  }

  async function deleteTask(taskToDelete: any) {
    const response = await axios.delete(`/api/task/${taskToDelete.id}`);
    console.log(response);
    if(response.status == 200){
      const index = tasks.findIndex((task) => task.id === taskToDelete.id)
      if( index > -1 ) {
        const newTasks = tasks
        newTasks.splice(index, 1)
        setTasks([...newTasks])
      }
    }
    closeTaskModal()
  }

  async function moveTask(taskToMove: any) {
    console.log('editing')
    console.log(taskToMove)
    const response = await axios.patch(`/api/task/${taskToMove.id}`, {
      column_id: taskToMove.column_id, // switch to actual column to move to
      title: taskToMove.title,
      description: taskToMove.description
    });
    console.log(response);
    if(response.status == 200){
      const index = tasks.findIndex((task) => task.id === taskToBeEdited.id)
      const newTasks = tasks
      newTasks[index] = {id: taskToBeEdited.id, column_id: taskToBeEdited.column_id, title: newTaskTitle, description: newTaskDescription}
      setTasks(newTasks)
    }
    setIsEditing(false)
    setTaskToBeEdited(null)
    setNewTaskTitle("")
    setNewTaskDescription("")
    closeTaskModal()
  }
  
  const taskUtils = {move: moveTask, edit: startEditing, delete: deleteTask}

  

  return (
    <>
      <Stack spacing={1} minWidth={"20ch"}>
        <Stack>
        <Typography variant="h4" gutterBottom>
          {column.title}
        </Typography>
        <IconButton onClick={()=>{deleteColumn(column.id)}}><Remove></Remove></IconButton>
      </Stack>
        {tasks.map((task) => <>
          <Task task={task as {id: number, column_id: number, title: string, description: string}} taskUtils={taskUtils}></Task>
        </>)}
        <IconButton onClick={openTaskModal} size="large"><Add></Add></IconButton>
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
              {isEditing 
            ? "Edit Task"
            : "Create new Task"
            }
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
            {isEditing 
            ? <Button variant="outlined" onClick={editTask}>Edit</Button>
            : <Button variant="outlined" onClick={createNewTask}>Create</Button>
            }
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default Column;
