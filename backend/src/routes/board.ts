import express from 'express'
import { helloBoard } from '../controllers/board.ts'

const router = express.Router()

router.get('/', helloBoard)

export default router