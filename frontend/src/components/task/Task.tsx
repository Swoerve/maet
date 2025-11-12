
import { useState } from "react";
import { Card, CardContent, Menu, MenuItem, Typography } from "@mui/material";


function Task({task, taskUtils}: {
  task: {id: number, column_id: number, title: string, description: string},
  taskUtils: {move: (task: unknown) => Promise<void>, edit: (newTask: unknown) => Promise<void>, delete: (task: unknown) => Promise<void>}}
) {
  //console.log(task)

  const [contextMenu, setContextMenu] = useState<{
  mouseX: number;
  mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  }
  
  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <>
      <Card onContextMenu={handleContextMenu} >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2">
            {task.description}
          </Typography>
        </CardContent>
      </Card>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
        }
        >
          {/* <MenuItem onClick={taskUtils.move}>Move</MenuItem> */}
          <MenuItem onClick={() => {taskUtils.edit(task); handleClose()}}>Edit</MenuItem>
          <MenuItem onClick={() => {taskUtils.delete(task); handleClose()}}>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default Task;
