import db from '../models/postgres.js'

export function fetchHelloBoard(): string {
  return 'hello Board';
}

export function createBoard(owner_id: number, title: string){
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

export function editBoardTitle(id: number, title: string){
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

export function getBoardById(id: number): {result: boolean, body?: Record<string, unknown>, error?: unknown}{
  db.one(`SELECT 1 FROM boards WHERE id = $1`, [id])
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
  return {
    result: false
  }
}

export function getBoardByUser(id: number): {result: boolean, data?: unknown[], error?: unknown} {
  db.many(`SELECT * FROM boardusers WHERE boardusers.user_id = $1`, [id])
  .then((data) => {
    // eslint-disable-next-line prefer-const
    let result: {result: unknown, data: unknown[]} = {
      result: true,
      data: []
    }
    data.forEach((d: Record<string, unknown>) => {
      result.data.push(d.id)
    })
    result.result = true
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
  return {
    result: false
  }
}

export function createUserBoardConnection(user_id: number, board_id: number, is_owner: boolean){
  db.one(`INSERT INTO boardusers(user_id, board_id, is_owner) VALUES($1, $2, $3)`, [user_id, board_id, is_owner])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
}
