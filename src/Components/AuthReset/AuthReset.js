import React, { useState, useEffect } from 'react';
import './AuthReset.css';

//Material UI
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//Actions
import { resetPassword } from '../../Actions/index';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const AuthReset = ({ setOpenModal }) => {

  const dispatch = useDispatch();
  const state = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const [password2, setPassword2] = useState('');

  const [passwordData, setPasswordData] = useState({
    id: '',
    token: '',
    password: '',
    emai: '',
  });

  useEffect(() => {
    setPasswordData({
      ...passwordData,
      id: state?.forgotPasswordData?.id,
      token: state?.forgotPasswordData?.token
    })
  }, [state.forgotPasswordData])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    if(passwordData.password === password2){
      dispatch(resetPassword(passwordData));
      setPasswordData({
        id: '',
        tokem: '',
        password: '',
        emai: '',
      });
      setPassword2('');
      setOpen(true)
  
      //Clearing the forgot password data after resetting the password
      dispatch({ type: 'CLEAR_FORGOT_PASSWORD_DATA' });
    }
    else{
      alert(`Passwords don't match`);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    //Clearing the forgot password data after resetting the password
    dispatch({ type: 'CLEAR_FORGOT_PASSWORD_DATA' });
  }

    return (
        <div className="auth-reset-background">
        <div className="auth-reset-container">
          <div className="title">
            <h1>Reset your password</h1>
          </div>
          <div className="auth-reset-body">
              <input type="email" placeholder="Email" className="auth-input" value={passwordData.email} onChange={(event) => setPasswordData({ ...passwordData, email: event.target.value })}/>
              <input type="password" placeholder="Password" className="auth-input" value={passwordData.password} onChange={(event) => setPasswordData({ ...passwordData, password: event.target.value })}/>
              <input type="password" placeholder="Confirm Password" className="auth-input" value={password2} onChange={(event) => setPassword2(event.target.value)}/>
          </div>
          <div className="auth-reset-footer">
            <button className="cancel" onClick={handleModalClose} >Cancel</button>
            <button className="continue" onClick={handleResetPassword}>Continue</button>
          </div>
        </div>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <Alert onClose={handleClose} severity="success">
                Password Successfully Updated
            </Alert>
        </Snackbar>

      </div>

    )
}

export default AuthReset
