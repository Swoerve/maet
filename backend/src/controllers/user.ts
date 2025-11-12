import { dropUser, editExistingUser, fetchHelloUser, getUserByEmail, getUserById, postNewUser, verifyUser } from '../services/user.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function helloUser(req: Request, res: Response) {
  return fetchHelloUser();
}

export async function createNewUser(req: Request, res: Response) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  const serviceResult = await postNewUser(username, email, password)

  if(serviceResult.result){
    res.status(200).json(serviceResult.data)
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}

export async function patchUser(req: Request, res: Response) {
  console.log(req.body)
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const id = Number(req.params.id)

  const serviceResult = await editExistingUser(id, username, email, password)

  if(serviceResult.result){
    res.status(200).json(serviceResult.data)
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}


export async function getVerify(req: Request, res: Response) {
  const email = req.body.email
  const password = req.body.password

  const serviceResult = await verifyUser(email, password)

  if(serviceResult.result){
    res.status(200).json(serviceResult.data)
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}

export async function getUser(req: Request, res: Response) {
  const id = Number(req.params.id)

  const serviceResult = await getUserById(id)
  console.log('-----')
  console.log(serviceResult)
  if(serviceResult.result){
    res.status(200).json(serviceResult.data)
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}

export async function getEmail(req: Request, res: Response) {
  const email = req.body.email

  const serviceResult = await getUserByEmail(email)
  console.log('-----')
  console.log(serviceResult)
  if(serviceResult.result){
    res.status(200).json(serviceResult.data)
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id)

  const serviceResult = await dropUser(id)

  if(serviceResult.result){
    res.status(200).send('user deleted')
  } else {
    res.status(500).send(serviceResult.error.message)
  }
}
