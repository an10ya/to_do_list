import mongoose from 'mongoose';
import Users from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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

        const token = jwt.sign({ email: userPresent.email, id: userPresent._id }, 'test', { expiresIn: '30m' });
        res.status(200).json({ result: userPresent, token: token });
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: 'Error while login' });
    }
}

export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try{
        const userPresent = await Users.findOne({ email: email });
        if(!userPresent){
            res.status(404).json({ message: 'User is not present '});
        }
        //Creating one time password link which is valid for 10 minutes
        const jwtSecret = "test" + userPresent.password;
        const payLoad = { 
            id: userPresent._id,
            email: userPresent.email
        }
        //Same as the above method (To create a token)
        //const token = jwt.sign({ email: userPresent.email, id: userPresent._id }, 'test', {expiresIn: '30m' });
        const token = jwt.sign(payLoad, jwtSecret, { expiresIn: '60m' });
        res.status(200).json({ id: userPresent._id, token: token });
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: 'Error while password forget' });
    }
}

export const resetPassword = async (req, res) => {
    try{
         const { id, token, password, email } = req.body;
         const userPresentWithId = await Users.findOne({ _id: id });
         const userPresentWithEmail = await Users.findOne({ email: email });
         if(!userPresentWithId){
            res.status(404).json({ message: 'User is not present with the Id '});
        }
        if(!userPresentWithEmail){
            res.status(404).json({ message: 'User is not present with the email '});
        }
        const jwtSecret = "test" + userPresentWithId.password;

        //Validating the token
        const payload = jwt.verify(token, jwtSecret);

        //Hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Updating the password
        const updatedUser = await Users.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        res.status(200).json({ result: updatedUser });
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: 'Error while password reset' });
    }
}