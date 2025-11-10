import express from 'express';
import { helloBoard } from '../controllers/board.js';

const router = express.Router();

router.get('/', helloBoard);

// create new board
// expecting 
// owner_id = int
// title = string
router.post('/', (req, res) => {
  res.send(`creating new board`);
});

// edit board
router.patch('/:id', (req, res) => {
  res.send(`editing board with id ${req.params.id}`);
});

// get a board
router.get('/:id', (req, res) => {
  res.send(`getting board with id ${req.params.id}`);
});

// get boards user is part of
// edit board
router.get('/user/:id', (req, res) => {
  res.send(`getting boards of user ${req.params.id}`);
});

// make a user and board connection
// used when a user gets "invited" or joins a board
// edit board
router.post('/join', (req, res) => {
  res.send(`joining board with user`);
});

export default router;
