import {fetchHelloBoard} from '../services/board.ts'
import type {Request, Response} from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloBoard(req: Request, res: Response): string {
    return fetchHelloBoard()
}