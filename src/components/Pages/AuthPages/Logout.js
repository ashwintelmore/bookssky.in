import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../actions';
import Loader from '../../Helper/components/Loader';
import Message from '../../Layout/components/Message';
/**
* @author
* @function LogoutPage
**/

const LogoutPage = (props) => {
    document.title="logout"
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if (auth.isUserLogin) {
            dispatch(userLogout())
        }
    }, [auth.user.isUserLogin])

    
    if (auth.loading) {
        return <Loader />
    }
    return (
        <Message
            heading="Your have Successfully Logout"
            message="Thanks for using Bookssky.in . Hope You will come back 😊💕"
            btnLink="/login"
            btnText="Login"
        />
    )
}


export default LogoutPage