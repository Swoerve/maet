/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/postgres.js'

export async function fetchHelloBoard() {
  return 'hello Board';
}

export async function createBoard(owner_id: number, title: string){
  db.one(`INSERT INTO boards(owner_id, title) VALUES($1, $2)`, [owner_id, title])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
}

export async function editBoardTitle(id: number, title: string){
  db.one(`UPDATE boards SET title = $2 WHERE id = $1`, [id, title])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
}

export async function getBoardById(id: number): Promise<any>{
  const response = await db.one(`SELECT * FROM boards WHERE id = $1`, [id])
  .then((data) => {
    console.log(data)
    return {
      result: true,
      body: {
        id: data.id,
        owner_id: data.owner_id,
        title: data.title
      }
    }
  })
  .catch((error) => {
    console.log(error)
    return {
      result: false,
      error: error
    }
  })
  return response
}

export async function getBoardByUser(id: number): Promise<any> {
  const response = await db.many(`SELECT * FROM boardusers WHERE boardusers.user_id = $1`, [id])
  .then((data) => {
    // eslint-disable-next-line prefer-const
    let result: {result: unknown, data: unknown[]} = {
      result: true,
      data: []
    }
    data.forEach((d: Record<string, unknown>) => {
      console.log(d)
      result.data.push(d.board_id)
    })
    console.log(data)
    return result
  })
  .catch((error) => {
    console.log(error)
    return {
      result: false,
      error: error
    }
  })
  return response
}

export async function createUserBoardConnection(user_id: number, board_id: number, is_owner: boolean){
  await db.one(`INSERT INTO boardusers(user_id, board_id, is_owner) VALUES($1, $2, $3)`, [user_id, board_id, is_owner])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
}
