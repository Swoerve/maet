import { fetchHelloBoard } from '../services/board.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloBoard(req: Request, res: Response): string {
  return fetchHelloBoard();
}

export function postBoard(req: Request, res: Response){
  res.send(`creating new board`);
}

export function patchBoard(req: Request, res: Response){
  res.send(`editing board with id ${req.params.id}`);
}

export function getBoard(req: Request, res: Response){
  res.send(`getting board with id ${req.params.id}`);
}

export function getUserBoards(req: Request, res: Response){
  res.send(`getting board of user with id ${req.params.id}`);
}

export function postUserBoardConnection(req: Request, res: Response){
  res.send(`adding user with id ${req.params.id} to board with id ${req.params.id}`);
}


