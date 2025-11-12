/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/postgres.js'

export async function createTask(colume_id:number, title:string, description:string ) {
  db.one(`INSERT INTO tasks(colume_id, title, description) VALUES($1, $2, $3)`, [colume_id, title, description])
    .then((data) =>{
    console.log(data)
    return true
  })
  .catch((error) =>{
    console.log(error)
  })
  return false
}

export async function editTask(id:number, colume_id:number, title:string, description:string) {
  db.one(`UPDATE task SET colume_id = $2, title = $3, description = $4 WHERE id $1`,[id, colume_id, title, description])
    .then((data) => {
    console.log(data)
    return true
  }) 
  .catch((error) => {
    console.log(error)
  })
  return false
}

export async function getTaskById(id:number): Promise<any>{
  const response = await db.one(`SELECT * FROM task WHERE id $1`,[id])
  .then((data) => {
    console.log(data)
    return{
      result: true,
      body: {
        id: data.id,
        colume_id: data.colume_id,
        title: data.title,
        description: data.description
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

export async function getTaskByColume(id:number): Promise<any>{
  const response = await db.many(`SELECT * FROM taskcolums WHERE taskcolums.colume_id = $1`,[id])
  .then((data) => {
    const result: {result: unknown, data: unknown[]} = {
      result: true,
      data: []
    }
    data.forEach((d: Record<string, unknown>) => {
      console.log(d)
      result.data.push(d.task_id)
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

export async function deleteColumeTask(id:number) {
  db.one(`DELETE FROM task WHERE id = $1`, [id])
  return true
}