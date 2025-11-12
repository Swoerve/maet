/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/postgres.js'

export async function fetchHelloBoard() {
  return 'hello Board';
}

export async function createBoard(owner_id: number, title: string){
  const response = await db.one(`INSERT INTO boards(owner_id, title) VALUES($1, $2) RETURNING id, owner_id, title`, [owner_id, title])
  .then((data) => {
    console.log(data)
    return data
  })
  .catch((error) => {
    console.log(error)
    return false
  })

  if(response == false){
    return false
  }
  const response2 = await createUserBoardConnection(response.owner_id, response.id, true)
  if(response2 === false) {
    return false
  }
  return {id: response.id, title: response.title}
}

export async function editBoardTitle(id: number, title: string){
  return await db.none(`UPDATE boards SET title = $2 WHERE id = $1`, [id, title])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
    return false
  })
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
  const response = await db.any(`SELECT * FROM boardusers WHERE boardusers.user_id = $1`, [id])
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
  return await db.none(`INSERT INTO boardusers(user_id, board_id, is_owner) VALUES($1, $2, $3)`, [user_id, board_id, is_owner])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
}

export async function removeUserBoardConnection(user_id: number, board_id: number){
  return await db.none(`DELETE FROM boardusers WHERE user_id = $1 AND board_id = $2`, [user_id, board_id])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
    return false
  })
}

export async function deleteBoardById(id: number){
  return await db.none(`DELETE FROM boards WHERE id = $1`, [id])
  .then(()=>{
    console.log(`deleted board with id ${id}`)
    return true
  })
  .catch((error)=>{
    console.log(error)
    return false
  })
}
