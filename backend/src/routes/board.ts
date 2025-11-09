import express from 'express'
import { helloBoard } from '../controllers/board.js'

const router = express.Router()

router.get('/', helloBoard)

export default router