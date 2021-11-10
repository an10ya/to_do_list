import React, { useState } from 'react';
import './Auth.css';
import FileBase from 'react-file-base64';
import { GoogleLogin } from 'react-google-login';
import AuthReset from '../AuthReset/AuthReset';


//Actions
import { register, login, forgotPassword } from '../../Actions/index';

//Redux
import { useDispatch } from 'react-redux';

const Auth = () => {

    //false - login page visible
    //true - register page visible
    const [authClass, setAuthClass] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const loginShift = () => {
        setAuthClass(false);
    }

    const registerShift = () => {
        setAuthClass(true);
    }

    const [userRegisterData, setUserRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        profile: '',
    });

    const [userLoginData, setUserLoginData] = useState({
        username: '',
        email: '',
        password: '',
    });

    //Register function
    const registerUser = async (event) => {
        event.preventDefault();
        dispatch(register(userRegisterData));
        setUserRegisterData({
            username: '',
            email: '',
            password: '',
            profile: '',
        })
    };

    //Login function
    const loginUser = async (event) => {
        event.preventDefault();
        dispatch(login(userLoginData));
        setUserLoginData({
            username: '',
            email: '',
            password: '',
        })
    };

    const responseGoogle = (response) => {
        const result=response.profileObj;
        const token=response.tokenId;
        if(authClass){
            dispatch({ type: 'REGISTER_USER', payload: { result, token }});
        }
        else{
            dispatch({ type: 'LOGIN_USER', payload: { result, token }});
        }
    };

    const handleForgotPassword = (event) => {
        event.preventDefault();
        setModalOpen(true);
        dispatch(forgotPassword({ email: userLoginData.email }));
    }

    return (
        
        <>
        <div className="auth-body">
        { !modalOpen ?
        <div className={ authClass ? 'auth right-panel-active' : 'auth' } id="auth">
            <div className="auth-container register-container">
                <div className="auth-form">
                    <h1>Create Account</h1>
                    <div className="auth-social">
                        <GoogleLogin 
                        clientId="673997053848-uul00dfp8112ev28ff59ahhmbuncu0db.apps.googleusercontent.com" 
                        buttonText="using Google" 
                        onSuccess={responseGoogle} 
                        onFailure={responseGoogle} 
                        cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Username" className="auth-input" value={userRegisterData.username} onChange={(event) => setUserRegisterData({...userRegisterData, username: event.target.value })}/>
                    <input type="email" placeholder="Email" className="auth-input" value={userRegisterData.email} onChange={(event) => setUserRegisterData({...userRegisterData, email: event.target.value })}/>
                    <input type="password" placeholder="Password" className="auth-input" value={userRegisterData.password} onChange={(event) => setUserRegisterData({...userRegisterData, password: event.target.value })}/>
                    <div className="file">
                            <FileBase type="file" multiple={false} onDone={( {base64} ) => setUserRegisterData({ ...userRegisterData, profile: base64 })} />
                    </div>
                    <button onClick={registerUser}>Sign Up</button>
                </div>
            </div>

            <div className="auth-container login-container">
                <div className="auth-form">
                    <h1>Sign in</h1>
                    <div className="auth-social">
                        <GoogleLogin 
                        clientId="673997053848-uul00dfp8112ev28ff59ahhmbuncu0db.apps.googleusercontent.com" 
                        buttonText="using Google" 
                        onSuccess={responseGoogle} 
                        onFailure={responseGoogle} 
                        cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" className="auth-input" value={userLoginData.email} onChange={(event) => setUserLoginData({...userLoginData, email: event.target.value })}/>
                    <input type="password" placeholder="Password" className="auth-input" value={userLoginData.password} onChange={(event) => setUserLoginData({...userLoginData, password: event.target.value })}/>
                    <p onClick={handleForgotPassword}>Forgot your password?</p>
                    <button onClick={loginUser}>Sign In</button>
                </div>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <img src="../static/login.svg" className="overlay-left-image" alt="Logo"/>
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="overlay-login" id="overlay-login" onClick={loginShift}>Login</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <img src="../static/register.svg" className="overlay-right-image" alt="Logo"/>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="overlay-register" id="overlay-register" onClick={registerShift}>Register</button>
                    </div>
                </div>
            </div>
        </div>
         : 
         null
        }
        {modalOpen && <AuthReset setOpenModal={setModalOpen} />}
        </div>
        </>
    )
}

export default Auth
