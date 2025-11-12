import pg from 'pg-promise';
import 'dotenv/config'

const pgp = pg();

const PG_URI = process.env.PG_URI;

console.log(process.env)

console.log(PG_URI)

if (!PG_URI) {
  throw 'PG_URI not setup';
}

const db = pgp(PG_URI);

await db.any(`DROP TABLE IF EXISTS tasks`); // remove on prod
await db.any(`DROP TABLE IF EXISTS columns`); // remove on prod
await db.any(`DROP TABLE IF EXISTS boardusers`); // remove on prod
await db.any(`DROP TABLE IF EXISTS boards`); // remove on prod
await db.any(`DROP TABLE IF EXISTS users`); // remove on prod

await db.any(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
    )
`);


await db.any(`CREATE TABLE IF NOT EXISTS boards(
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL
    )
`);


await db.any(`CREATE TABLE IF NOT EXISTS boardusers(
    board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_owner BOOL NOT NULL
    )
`);


await db.any(`CREATE TABLE IF NOT EXISTS columns(
    id SERIAL PRIMARY KEY,
    board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL
    )
`);


await db.any(`CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    column_id INTEGER NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL
    )
`);

export default db;
