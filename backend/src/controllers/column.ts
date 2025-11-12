import {createColume, editColumeTitle ,getColumeById, getColumeByBoard, deleteBoardColume} from '../services/column.js'
import type { Request, Response } from 'express';

export async function postColume(req: Request, res: Response){
  console.log(req.body)
  const board_id: number = req.body.board_id
  const title: string = req.body.title
  const response = await createColume(board_id, title)
  if(response){
    res.status(200).send()
  } else {
    res.status(500).send()
  }
}

export async function patchColume(req: Request, res: Response){
  const colume_id = req.params.id 
  const title = req.body.title
  if(colume_id === undefined){
    res.status(401).send('no colume id provided')
    return
  }
  const serviceResult = await editColumeTitle(Number(colume_id), title)
  if(serviceResult){
    res.status(200).send(`editing colume with id ${req.params.id}`);
  } else {
    res.status(500).send('something went wrong')
  }
}

export async function getColume(req: Request, res: Response){
  const colume_id = req.params.id 
  if(colume_id === undefined){
    res.status(401).send('no colume id provided')
    return
  }
  const serviceResult = await getColumeById(Number(colume_id))
  if(serviceResult.result){
    res.status(200).json(serviceResult.body);
  } else {
    res.status(500).send('something went wrong')
  }
}

export async function getBoardeColume(req: Request, res: Response){
  const board_id = req.params.id 
  if(board_id === undefined){
    res.status(401).send('no board id provided')
    return
  }
  const serviceResult = await getColumeByBoard(Number(board_id))
  console.log(serviceResult)
  if(serviceResult.result === true){
    res.status(200).json(serviceResult.data);
  } else {
    res.status(500).send('something went wrong')
  }
}

export async function deleteColume(req: Request, res: Response) {
  const colume_id = req.params.id 
    if(colume_id === undefined){
    res.status(401).send('no colume id provided')
    return
  }
  await deleteBoardColume(Number(colume_id))
  res.status(200).send();
}
