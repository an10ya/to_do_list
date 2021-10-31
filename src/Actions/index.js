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
