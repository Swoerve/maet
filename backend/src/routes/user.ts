import express from 'express';

const router = express.Router();

// base route, used for testing
router.get('/', (req, res) => {
  res.send('hello user');
});

// create user

router.post('/new', (req, res) => {
  res.send('new user');
});

// edit user
router.patch('/:id', (req, res) => {
  res.send(`editing user ${req.params.id}`);
});

// check if password match?
router.get('/check', (req, res) => {
  // look for user with matchin mail and password?
  // respond with a true or false value?
  res.send('new user');
});

// get user
router.get('/:id', (req, res) => {
  res.send(`getting user ${req.params.id}`);
});

// delete user
router.delete('/:id', (req, res) => {
  res.send(`deleting user ${req.params.id}`);
});

export default router;
