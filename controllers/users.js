import mongoose from 'mongoose';
import Users from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    const {username, email, password, profile} = req.body;

    try{
        //Check 1 - User already registered or not
        const existingUser = await Users.findOne({ email: email });
        if(existingUser){
            res.status(404).json({ message: 'User is already registered' });
        }

        //Registering the user
        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await Users.create({ email: email, password: hashedPassword, username: username, profile: profile });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '30m' });
        res.status(200).json({ result: result, token: token });
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: 'Error while registering the user' });
    }
}

export const login = async (req, res) => {

    const { username, email, password } = req.body;

    try{
        const userPresent = await Users.findOne({ email: email });
        if(!userPresent){
            res.status(404).send('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, userPresent.password);
        if(!isPasswordCorrect){
            res.status(404).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ email: userPresent.email, id: userPresent._id }, 'test', {expiresIn: '30m' });
        res.status(200).json({ result: userPresent, token: token });
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: 'Error while login' });
    }
}
