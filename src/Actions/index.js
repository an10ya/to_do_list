//Actions are the functions which returns a dispatch
import * as apis from '../Apis/index';

export const register = (userRegisterData) => async (dispatch) => {
    try{
        const { data } = await apis.register(userRegisterData);
        dispatch({ type: 'REGISTER_USER', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const login = (userLoginData) => async (dispatch) => {
    try{
        const { data } = await apis.login(userLoginData);
        dispatch({ type: 'LOGIN_USER', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try{
        const { data } = await apis.forgotPassword(email);
        dispatch({ type: 'FORGOT_PASSWORD', payload: data });
    }
    catch(err){
        console.log(err);
    }
}

export const resetPassword = (resetPasswordData) => async (dispatch) => {
    try{
        const { data } = await apis.resetPassword(resetPasswordData);
        dispatch({ type: 'RESET_PASSWORD', payload: data });
    }
    catch(err){
        console.log(err);
    }
}