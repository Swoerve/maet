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

export function getBoardById(id: number){
  db.one(`SELECT 1 FROM boards WHERE id = $1`, [id])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
}

export function getBoardByUser(id: number){
  db.many(`SELECT * FROM boardusers WHERE boardusers.user_id = $1`, [id])
  .then((data) => {
    console.log(data)
    return true
  })
  .catch((error) => {
    console.log(error)
  })
  return false
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
