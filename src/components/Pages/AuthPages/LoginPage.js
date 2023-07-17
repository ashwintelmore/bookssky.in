import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'firebase';

import bookwithstudent from '../../../assets/bookwithstudent.png'
import Input from '../../Layout/components/Input'
import { useFirestore } from 'reactfire';

import { app } from '../../../firebase/base';
import { CLEAN_UP_AUTH, LoginUser, userLoginOrNOt } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Helper/components/Loader';
const authFirebase = app.auth();
/**
 * @author
 * @function Login
 **/

const Login = (props) => {
    //hooks
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    //State variable
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    //funtions
    const login = (e) => {
        e.preventDefault();
        if (user.email === "" || user.password === "")
            return setError("Email and password should be not empty");
        setError("");
        dispatch(LoginUser(user));
    };

    useEffect(() => {
        return ()=>{
            if ( Object.keys(auth.error).length > 0) {
                dispatch(CLEAN_UP_AUTH())
            }
        }
    }, [])
  
    if (auth.loading) {
        return (<Loader />)
    }
    return (
        <section>
            <form onSubmit={login}>
                <div className="auth__content  flex flex-jc-c ">
                    <div className="fill__form flex flex-jc-c flex-ai-c">
                        <h1 className="heading">Login</h1>
                        <p className="error error_bold">{auth.error.errorMessage}</p>
                        <p className="error error_bold">{error}</p>
                        <Input
                            label="Email Id"
                            placeholder="e.g. bookssky@gmail.com"
                            messege="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, odit. "
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                        <Input
                            label="Password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        // messege="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, odit. "
                        />
                        <div className="btn__login">
                            <button className="btn">Login</button>
                        </div>
                        <div className="auth__links">
                            <Link to="/registration"><h4>Create Account </h4></Link>
                            <a href="#"> <h5 className="error">Forget Password?</h5></a>
                        </div>

                    </div>
                    <div className="illustration display-small-none  flex flex-jc-c flex-ai-c">
                        <img src={bookwithstudent} alt="" />
                    </div>
                </div>
            </form>
        </section>
    )
}


export default Login;