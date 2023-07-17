import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userDelet, userLogout } from '../../../actions';
import firebase from 'firebase'
import Popup from '../../Helper/components/Popup';
import Message from './Message'
import { app } from '../../../firebase/base'
const appAuth = app.auth();
/**
* @author
* @function ConfirmEmail
**/

const ConfirmEmail = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [status_send, setStatus_send] = useState(false)
    const [req_loder, setReq_loder] = useState(false)
    // appAuth.applyActionCode()

    const changeDetails = async () => {
        const userRef = appAuth.currentUser;

        if (userRef.emailVerified === false) {
            setReq_loder(true)
            await userRef.sendEmailVerification().then(() => {
                setReq_loder(false)
                setStatus_send(true)
                localStorage.setItem("mailSend", true)


            }).catch((error) => {
                localStorage.removeItem("mailSend")
            })
        } else {
            //already verified
        }
    }
    useEffect(() => {
        return () => {
            if (localStorage.getItem("mailSend") !== null) {
                window.location.reload();
                localStorage.removeItem("mailSend")
            }
        };
    }, [])
    return (
        <>
            <Message
                heading="Steps For Mail Verification"
                message="To use of Bookssky.in services you have to Verify your mail"
                btnLink="/profile/userallbooks"
                btnText="Profile"
            >
                <ol>
                    <li className="text-content">
                        Click on <button className="btn-3">send mail</button>  button for receiving a verification mail
                    </li>
                    <li className="text-content">
                        Check your gmail we have sent link verification, You have to Click on blue link
                    </li>
                    <li className="text-content">After clicking on link you have to come back on this page
                    </li>
                    <li className="text-content">
                        And Congrats!! your email verification is successfully done. now you can use all features of <Link to="/" className="hyper_link">booksskysin</Link>
                    </li>
                </ol>
                {
                    auth.user.emailVerified ?
                        <Link to="/registration">
                            <button className="btn" disabled style={{ margin: "10px", width: "200px" }}>
                                Already Verified
                            </button>
                        </Link>
                        :
                        status_send ?
                            req_loder ?
                                <button className="btn" disabled onClick={changeDetails} style={{ margin: "10px", width: "170px" }}>
                                    Sending...
                                </button>
                                :
                                <button className="btn" disabled onClick={changeDetails} style={{ margin: "10px", width: "170px" }}>
                                    Check Your Mail
                                </button>
                            :
                            <button className="btn" onClick={changeDetails} style={{ margin: "10px" }}>
                                Send Mail
                            </button>
                }
            </Message>

        </>
    )
}
const VerifiedEmail = (props) => {
    const [show, setShow] = useState(true)
    const dispatch = useDispatch();


    return (
        <>

            <Popup
                heading="Email address has been verified."
                message="You Can now use our all services"
                btnLink="/profile/userallbooks"
                btnLinkText="Profile"
                closeLink="/profile/userallbooks"
                show={show}
                onClose={() => setShow(false)}
            >

            </Popup>

        </>
    )
}


export default ConfirmEmail
export { VerifiedEmail }