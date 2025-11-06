import pg from 'pg-promise'

const pgp = pg()

const PG_URI = process.env.PG_URI

if(!PG_URI){
    throw 'PG_URI not setup'
}

const db = pgp(PG_URI)

await db.one(`DROP TABLE IF EXISTS users`) // remove on prod

await db.one(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY
    username VARCHAR NOT NULL
    email VARCHAR NOT NULL UNIQUE
    password VARCHAR NOT NULL
    )
`)

await db.one(`DROP TABLE IF EXISTS boards`) // remove on prod

await db.one(`CREATE TABLE IF NOT EXISTS boards(
    id INTEGER PRIMARY KEY
    owner_id INTEGER NOT NULL
    title VARCHAR NOT NULL
    )
`)

await db.one(`DROP TABLE IF EXISTS boardusers`) // remove on prod

await db.one(`CREATE TABLE IF NOT EXISTS boardusers(
    board_id INTEGER NOT NULL
    user_id INTEGER NOT NULL
    is_owner BOOL NOT NULL
    )
`)

await db.one(`DROP TABLE IF EXISTS columns`) // remove on prod

await db.one(`CREATE TABLE IF NOT EXISTS columns(
    id INTEGER PRIMARY KEY
    board_id INTEGER NOT NULL
    title VARCHAR NOT NULL
    )
`)

await db.one(`DROP TABLE IF EXISTS tasks`) // remove on prod

await db.one(`CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY
    column_id INTEGER NOT NULL
    title VARCHAR NOT NULL
    description TEXT NOT NULL
    )
`)

export default db