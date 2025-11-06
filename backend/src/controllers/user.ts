import {fetchHelloUser} from '../services/user.ts'
import type {Request, Response} from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloUser(req: Request, res: Response): string {
    return fetchHelloUser()
}