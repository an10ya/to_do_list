import express from 'express';
import { register, login } from '../controllers/users.js';

const router = express.Router();

//To register a User
router.post('/register', register);

//To login a User
router.post('/login', login);

export default router;