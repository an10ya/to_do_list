import axios from 'axios';

const URL = axios.create({ baseURL: 'http://localhost:5000'});

//Register User
export const register = (userRegister) => URL.post('/users/register', userRegister);

//Login User
export const login = (userLogin) => URL.post('/users/login', userLogin);