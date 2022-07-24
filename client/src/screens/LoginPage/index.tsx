import { Button, FormGroup, Input } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import isEmail from 'validator/lib/isEmail';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../helpers/firebase";
import { setUserInfo } from '../../helpers/localStorageHandler';

const LoginPage = () => {

    const history = useHistory();
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserInfo(JSON.stringify(user));
                history.push("/home");
            }
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isFirst) {
            setIsFirst(false);
            return;
        }

        setEmailError(!isEmail(email));
        setPasswordError(password.length < 8);
        // eslint-disable-next-line
    }, [email, password]);

    const _emailChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(e?.target.value);
    }

    const _passwordChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(e?.target.value);
    }

    const _loginButtonHandler = async () => {
        if (emailError || email.length === 0) {
            toast.error("Email is invalid!");
            return;
        }

        if (passwordError || email.length === 0) {
            toast.error("Password too short!");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password).then((value: UserCredential) => {
                setUserInfo(JSON.stringify(value));
                history.push("/home");
            });
        } catch (err: any) {
            toast.error("Invalid credentials");
            return
        }
    }

    return (
        <div className='login-container'>
            <div className="bubbles">
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
                <div className="bubble"></div>
            </div>

            <div className='container h-screen login-container-div'>
                <div className='flex flex-row justify-center items-center h-full'>
                    <FormGroup className='login-form items-center'>
                        <LockIcon className='login-form-icon mb-5' />
                        <Input
                            value={email}
                            onChange={_emailChangeHandler}
                            className='login-form-input'
                            placeholder='Enter your email...'
                            error={emailError}

                        />

                        <Input
                            value={password}
                            onChange={_passwordChangeHandler}
                            type="password"
                            className='login-form-input'
                            placeholder='Enter your password...'
                            error={passwordError}
                        />

                        <Button
                            onClick={_loginButtonHandler}
                            className='login-button'>
                            Login
                        </Button>
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default LoginPage