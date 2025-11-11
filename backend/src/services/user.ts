/* eslint-disable @typescript-eslint/no-explicit-any */

import db from '../models/postgres.js'

export async function fetchHelloUser() {
  return 'hello User';
}

export async function postNewUser(username: string, email: string, password: string): Promise<any> {

  const response = await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`, [username, email, password])
  .then(data => {
    console.log(data)
    return {result: true, data: {id: data.id, username: data.username, email: data.email}}
  })
  .catch(error => {
    console.error(error)
    return {result: false, error: error}
  })
  return response
}

export async function editExistingUser(id: number, username: string, email: string, password: string): Promise<any>  {

  const response = await db.one(`UPDATE users SET username = $2, email = $3, password = $4 WHERE id = $1`,
  [id, username, email, password])
  .then(data => {
    return {result: true, data: {id: data.id, username: data.username, email: data.email}}
  })
  .catch(error => {
    console.error(error)
  return {result: false, error: error}
  })
  return response
}

export async function verifyUser(email: string, password: string): Promise<any>  {

  const response = await db.one(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password])
  .then(data => {
    return {result: true, data: {id: data.id, username: data.username, email: data.email}}
  })
  .catch(error => {
    console.error(error)
  return {result: false, error: error}
  })
  return response
}

export async function getUserById(id: number): Promise<any>  {

  const response = await db.one(`SELECT FROM users WHERE id = $1`, [id])
  .then(data => {
    return {result: true, data: {id: data.id, username: data.username, email: data.email}}
  })
  .catch(error => {
    console.error(error)
  return {result: false, error: error}
  })
  return response
}

export async function dropUser(id: number): Promise<any>  {

  const response = await db.none(`DROP users WHERE id = $1`, [id])
  .then(() => {
    return {result: true}
  })
  .catch(error => {
    console.error(error)
  return {result: false, error: error}
  })
  return response
}
