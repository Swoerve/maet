// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs


Table users {
  id integer [primary key]
  username varchar [not null] // PU
  email varchar [not null, unique] // encrypted, PU
  password varchar [not null] // encrypted
  created_at timestamp
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
/* 
Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp
}

Table users {
  id integer [primary key]
  username varchar
  role varchar
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer [not null]
  status varchar
  created_at timestamp
}

Ref user_posts: posts.user_id > users.id // many-to-one

Ref: users.id < follows.following_user_id

Ref: users.id < follows.followed_user_id
 */
