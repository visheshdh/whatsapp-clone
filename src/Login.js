import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

export default function Login() {
    const [{user}, dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((data)=>{
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: data.user
                })
            })
            .catch((err)=>console.log(err))
    }
    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Signin to whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    SignIn with Gmail
                </Button>
            </div>            
        </div>
    )
}
