import express from 'express';
import { createNewUser, deleteUser, getUser, getVerify, patchUser } from '../controllers/user.js';

const router = express.Router();

// base route, used for testing
router.get('/', (req, res) => {
  res.send('hello user');
});

// create user
router.post('/', createNewUser);

// edit user
router.patch('/:id', patchUser);

// check if password match?
router.post('/verify', getVerify);

// get user, just to return user id to the client
router.get('/:id', getUser);

// delete user
router.delete('/:id', deleteUser);

export default router;
