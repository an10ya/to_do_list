import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/users.js';

const router = express.Router();

//To register a User
router.post('/register', register);

//To login a User
router.post('/login', login);

//To generate forgot password link
router.post('/forgotPassword', forgotPassword);

//To reset the password
router.post('/resetPassword', resetPassword);

export default router;