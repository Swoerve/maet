// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs


Table users {
  id integer [primary key]
  username varchar [not null] 
  email varchar [not null, unique] 
  password varchar [not null] 
}

Table boards {
 id integer [primary key]
 owner integer [not null]
 title varchar [not null]
}

Ref: boards.owner > users.id

Table BoardUsers {
 board_id integer [not null]
 user_id integer [not null]
 is_owner bool [not null]
}

Ref: BoardUsers.board_id > boards.id
Ref: BoardUsers.user_id > users.id

Table columns {
  id integer [primary key]
  board_id integer [not null]
  title varchar [not null]
}

Ref: columns.board_id > boards.id

Table tasks {
  id integer [primary key]
  column_id integer [not null]
  title varchar [not null]
  description text [not null]
}

Ref: tasks.column_id > columns.id
