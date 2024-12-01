const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../components/userController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticate, getAllUsers);

module.exports = router;
