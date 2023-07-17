import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CLEAN_UP_AUTH, RegisterUser } from '../../../actions'



import bookwithstudent from '../../../assets/bookwithstudent.png'
import Loader from '../../Helper/components/Loader'
import Input from '../../Layout/components/Input'
import Login from './LoginPage'

/**
* @author
* @function Registration
**/

const Registration = (props) => {
    //Hooks
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    // const history = useHistory();
    //State variable
    const [user, setUser] = useState({
        displayName: "",
        hide: false,
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const register = (e) => {
        e.preventDefault();
        if (user.password.trim() !== user.confirmPassword.trim())
            return setError("Password not Match ");
        if (user.email === "")
            return setError("Email and password should not be empty");
        if (user.displayName === "")
            return setError("Profile Name should not be empty");
        if (user.password === "")
            return setError("Password should not be empty");
        setError("");
        dispatch(RegisterUser(user));
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
            <form action="" method="POST" onSubmit={register}>
                <div className="auth__content flex flex-jc-c">
                    <div className="fill__form  flex flex-jc-c flex-ai-c">
                        <h1 className="heading">Registration</h1>
                        <p className="error error_bold">{auth.error.errorMessage}</p>
                        <p className="error error_bold">{error}</p>
                        <Input
                            label="Name"
                            placeholder="e.g. salman Khan"
                            messege="Be carefull this name will shows publicaly"
                            name="displayName"
                            value={user.displayName}
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
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
                            messege="Make strong password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                        <Input
                            label="Password"
                            placeholder="Password"
                            type="password"
                            messege="Re-Enter Password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                        <div className="btn__login">
                            <button className="btn ">Send Mail</button>
                        </div>
                        <div className="auth__links">
                            <Link to="/login" ><h4>Already have Account? </h4></Link>
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


export default Registration;