import { fetchHelloUser, postNewUser } from '../services/user.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloUser(req: Request, res: Response): string {
  return fetchHelloUser();
}

export function createNewUser(req: Request, res: Response): void {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  postNewUser(username, email, password)

  res.send("trying to create new user")
}
