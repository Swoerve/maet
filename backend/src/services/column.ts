/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/postgres.js'

export async function createColume(board_id:number, title:string): Promise<any> {
  return await db.one(`INSERT INTO columns(board_id, title) VALUES($1, $2) RETURNING id, board_id, title`, [board_id, title])
  .then((data) =>{
    console.log(data)
    return {result: true, data: {id: data.id, board_id: data.board_id, title: data.title}}
  })
  .catch((error) =>{
    console.log(error)
    return {result: false, error: error}
  })
}

export async function editColumeTitle(id:number, title:string) {
  return await db.one(`UPDATE columns SET title = $2 WHERE id = $1`, [id, title]) 
  .then((data) => {
    console.log(data)
    return true
  }) 
  .catch((error) => {
    console.log(error)
  })
}

export async function getColumeById(id:number): Promise<any>{
  const response = await db.one(`SELECT * FROM columns WHERE id = $1`, [id])
  .then((data) => {
    console.log(data)
    return{
      result: true,
      body: {
        id: data.id,
        board_id: data.board_id,
        title: data.title
      }
    }
  })
  .catch((error) => {
    console.log(error)
    return{
      result: false,
      error: error
    }
  })
  return response
}

export async function getColumeByBoard(id: number): Promise<any> {
  const response = await db.many(`SELECT * FROM columns WHERE board_id = $1`, [id])
  .then((data) => {
    const result: {result: unknown, data: unknown[]} = {
      result: true,
      data: []
    }
    data.forEach((d: Record<string, unknown>) => {
      console.log(d)
      result.data.push(d.id)
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

export async function deleteBoardColume(id: number) {
  db.one(`DELETE FROM columns WHERE = $1`,[id])
  return true
}
