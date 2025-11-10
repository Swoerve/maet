import { createBoard, createUserBoardConnection, editBoardTitle, fetchHelloBoard, getBoardById, getBoardByUser } from '../services/board.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloBoard(req: Request, res: Response): string {
  return fetchHelloBoard();
}

export function postBoard(req: Request, res: Response){
  const owner_id: number = req.body.owner_id
  const title: string = req.body.title
  createBoard(owner_id, title)
  res.status(200).send();
}

export function patchBoard(req: Request, res: Response){
  const board_id = req.params.id // should this be in body instead of params????
  const title = req.body.title

  if(board_id === undefined){
    res.status(401).send('no board id provided')
    return
  }

  const serviceResult = editBoardTitle(Number(board_id), title)
  if(serviceResult){
    res.status(200).send(`editing board with id ${req.params.id}`);
  } else {
    res.status(500).send('something went wrong')
  }
}

export function getBoard(req: Request, res: Response){
  const board_id = req.params.id // should this be in body instead of params????

  if(board_id === undefined){
    res.status(401).send('no board id provided')
    return
  }

  const serviceResult = getBoardById(Number(board_id))
  if(serviceResult.result){
    res.status(200).json(serviceResult.body);
  } else {
    res.status(500).send('something went wrong')
  }

}

export function getUserBoards(req: Request, res: Response){
  const user_id = req.params.id // should this be in body instead of params????

  if(user_id === undefined){
    res.status(401).send('no user id provided')
    return
  }

  const serviceResult = getBoardByUser(Number(user_id))
  if(serviceResult.result){
    res.status(200).json(serviceResult.data);
  } else {
    res.status(500).send('something went wrong')
  }

}

export function postUserBoardConnection(req: Request, res: Response){
  const user_id = req.body.user_id
  const board_id = req.body.board_id
  const is_owner = req.body.is_owner
  const serviceResult = createUserBoardConnection(user_id, board_id, is_owner)

  if( serviceResult ){
    res.status(200).send(`added a user to a board`);
  } else {
    res.status(500).send('something went wrong')
  }
}


