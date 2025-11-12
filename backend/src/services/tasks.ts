/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../models/postgres.js'

export async function createTask(column_id:number, title:string, description:string ): Promise<any> {
  return await db.one(`INSERT INTO tasks(column_id, title, description) VALUES($1, $2, $3) RETURNING id, column_id, title, description`, [column_id, title, description])
    .then((data) =>{
    console.log(data)
    return {result: true, data: {id: data.id, column_id: data.column_id, title: data.title, description: data.description}}
  })
  .catch((error) =>{
    console.log(error)
    return {result: false, error: error}
  })
}

export async function editTask(id:number, column_id:number, title:string, description:string) {
  return await db.one(`UPDATE tasks SET column_id = $2, title = $3, description = $4 WHERE id = $1 RETURNING id`,[id, column_id, title, description])
    .then((data) => {
    console.log(data)
    return true
  }) 
  .catch((error) => {
    console.log(error)
    return false
  })
}

export async function getTaskById(id:number): Promise<any>{
  const response = await db.one(`SELECT * FROM tasks WHERE id = $1`,[id])
  .then((data) => {
    console.log(data)
    return{
      result: true,
      data: {
        id: data.id,
        column_id: data.column_id,
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

export async function getTaskByColumn(id:number): Promise<any>{
  const response = await db.many(`SELECT * FROM tasks WHERE column_id = $1`,[id])
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

export async function deleteColumnTask(id:number) {
  return await db.none(`DELETE FROM tasks WHERE id = $1`, [id])
  .then((data) => {
    console.log(data)
    return true
  }).catch((error)=> {
    console.log(error)
    return false
  })
}
