import { fetchHelloUser, postNewUser } from '../services/user.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function helloUser(req: Request, res: Response) {
  return fetchHelloUser();
}

export async function createNewUser(req: Request, res: Response) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  await postNewUser(username, email, password)

  res.send("trying to create new user")
}
