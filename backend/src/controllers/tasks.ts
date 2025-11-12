import {createTask, editTask, getTaskByColumn, getTaskById, deleteColumnTask} from '../services/tasks.js'
import type { Request, Response } from 'express';

export async function postTask(req:Request, res:Response) {
  const column_id: number = req.body.column_id
  const title: string = req.body.title
  const description: string =req.body.description
  const response = await createTask(column_id, title, description)
  if(response.result){
    res.status(200).json(response.data);
  } else {
    res.status(500).json(response.error);
  }
}

export async function patchTask(req:Request, res:Response) {
  const task_id = req.params.id
  const column_id = req.body.column_id
  const title = req.body.title
  const description =req.body.description
    if(task_id === undefined){
      res.status(401).send('no task id provided')
      return
    }
    const serviceResult = await editTask(Number(task_id), column_id, title, description)
    if(serviceResult){
      res.status(200).send(`editing task with id ${req.params.id}`);
    } else {
      res.status(500).send('something went wrong')
    }
}

export async function getTask(req:Request, res:Response) {
  const task_id = req.params.id
  if(task_id === undefined){
      res.status(401).send('no task id provided')
      return
    }
    const serviceResult = await getTaskById(Number(task_id))
    if(serviceResult.result){
      res.status(200).json(serviceResult.data);
    } else {
      res.status(500).send('something went wrong')
    }
}

export async function getColumeTask(req:Request, res:Response) {
  const column_id = req.params.id
    if(column_id === undefined){
      res.status(401).send('no colume id provided')
      return
    }
    const serviceResult = await getTaskByColumn(Number(column_id))
    console.log(serviceResult)
    if(serviceResult.result === true){
      res.status(200).json(serviceResult.data);
    } else {
      res.status(500).send('something went wrong')
    }
}

export async function deleteTask(req: Request, res: Response) {
  const task_id = req.params.id 
    if(task_id === undefined){
    res.status(401).send('no task id provided')
    return
  }
  const response = await deleteColumnTask(Number(task_id))
  if(response){
    res.status(200).send();
  } else {
    res.status(500).send()
  }
}
