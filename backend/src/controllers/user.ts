import { fetchHelloUser } from '../services/user.js';
import type { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function helloUser(req: Request, res: Response): string {
  return fetchHelloUser();
}
