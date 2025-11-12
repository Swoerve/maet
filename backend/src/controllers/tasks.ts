import {createTask, editTask, getTaskByColume, getTaskById, deleteColumeTask} from '../services/tasks.js'
import type { Request, Response } from 'express';

export async function postTask(req:Request, res:Response) {
  const colume_id: number = req.body.colume_id
  const title: string = req.body.title
  const description: string =req.body.description
  await createTask(colume_id, title, description)
  res.status(200).send();
}

export async function patchTask(req:Request, res:Response) {
  const task_id = req.params.id
  const colume_id = req.body.colume_id
  const title = req.body.title
  const description =req.body.description
    if(task_id === undefined){
      res.status(401).send('no task id provided')
      return
    }
    const serviceResult = await editTask(Number(task_id), colume_id, description, title)
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
      res.status(200).json(serviceResult.body);
    } else {
      res.status(500).send('something went wrong')
    }
}

export async function getColumeTask(req:Request, res:Response) {
  const colume_id = req.params.id
    if(colume_id === undefined){
      res.status(401).send('no colume id provided')
      return
    }
    const serviceResult = await getTaskByColume(Number(colume_id))
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
  await deleteColumeTask(Number(task_id))
  res.status(200).send();
}