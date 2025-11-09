import express from 'express';
import { createNewUser } from '../controllers/user.js';

const router = express.Router();

// base route, used for testing
router.get('/', (req, res) => {
  res.send('hello user');
});

// create user

router.post('/new', createNewUser);

// edit user
router.patch('/:id', (req, res) => {
  res.send(`editing user ${req.params.id}`);
});

// check if password match?
router.get('/verify', (req, res) => {
  // look for user with matchin mail and password?
  // check if password = the req.body.password
  // respond with a true or false value?
  res.send('new user');
});

// get user, just to return user id to the client
router.get('/:id', (req, res) => {
  res.send(`getting user ${req.params.id}`);
});

// delete user
router.delete('/:id', (req, res) => {
  res.send(`deleting user ${req.params.id}`);
});

export default router;
