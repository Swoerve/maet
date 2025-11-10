import express from 'express';
import { getBoard, getUserBoards, helloBoard, patchBoard, postBoard, postUserBoardConnection } from '../controllers/board.js';

const router = express.Router();

router.get('/', helloBoard);

// create new board
// expecting 
// owner_id = int
// title = string
router.post('/', postBoard);

// edit board
router.patch('/:id', patchBoard);

// get a board
router.get('/:id', getBoard);

// get boards user is part of
// edit board
router.get('/user/:id', getUserBoards);

// make a user and board connection
// used when a user gets "invited" or joins a board
// edit board
router.post('/join', postUserBoardConnection);

export default router;
