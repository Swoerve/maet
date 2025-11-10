
import db from '../models/postgres.js'

export async function fetchHelloUser() {
  return 'hello User';
}

export async function postNewUser(username: string, email: string, password: string) {

  await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`, [username, email, password])
  .then(data => {console.log(data)})
  .catch(error => console.error(error))
  // if everything went well return true for success
  //return true

  // if everything went horrible return false for failure
  return
}

export async function editExistingUser(username: string, email: string, password: string) {

  await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`, [username, email, password])
  .then(data => {console.log(data)})
  .catch(error => console.error(error))
  // if everything went well return true for success
  //return true

  // if everything went horrible return false for failure
  return
}

export async function verifyUser(username: string, email: string, password: string) {

  await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`, [username, email, password])
  .then(data => {console.log(data)})
  .catch(error => console.error(error))
  // if everything went well return true for success
  //return true

  // if everything went horrible return false for failure
  return
}

export async function getUserById(username: string, email: string, password: string) {

  await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`, [username, email, password])
  .then(data => {console.log(data)})
  .catch(error => console.error(error))
  // if everything went well return true for success
  //return true

  // if everything went horrible return false for failure
  return
}

export async function dropUser(username: string, email: string, password: string) {

  await db.one(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`, [username, email, password])
  .then(data => {console.log(data)})
  .catch(error => console.error(error))
  // if everything went well return true for success
  //return true

  // if everything went horrible return false for failure
  return
}
