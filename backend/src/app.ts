//import express = require('express')
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.ts'
import boardRoutes from './routes/board.ts'

const app = express()

app.use(cors())
app.use(express.json())

// default route to test
app.get('/', (req, res) => {
    res.send('Hello World')
})

// routes
app.use('/user', userRoutes)
app.use('/board', boardRoutes)


export default app