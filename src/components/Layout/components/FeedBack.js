import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Popup from '../../Helper/components/Popup'
import Question from './FeedBack/Question'
import Input, { InputSelect } from './Input'

import { app } from '../../../firebase/base'
const authApp = app.auth();
const db = app.firestore();
/**
* @author
* @function FeedBack
**/

const FeedBack = (props) => {
    const [show, setShow] = useState(false)
    const auth = useSelector(state => state.auth)
    const [FDdata, setFDdata] = useState({
        uid: !auth.user.uid ? "" : auth.user.uid,
        userName: !auth.user.uid ? "" : auth.user.displayName,
        email: !auth.user.uid ? "" : auth.user.email,

        loadTime: "",
        helpFull: "",
        howEasy: "",
        satisfaction: "",
        FDtype: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFDdata({ ...FDdata, [name]: value })
    };
    useEffect(() => {

        // setTimeout(() => {
        //     setShow(true)
        // }, 5000);
        return () => {
            // console.log("clean up with time")
            setFDdata({
                uid: !auth.user.uid ? "" : auth.user.uid,
                userName: !auth.user.uid ? "" : auth.user.displayName,
                email: !auth.user.uid ? "" : auth.user.email,

                loadTime: "",
                helpFull: "",
                howEasy: "",
                satisfaction: "",
                FDtype: "",
                message: ""
            })
        }
    }, [])
    useEffect(() => {
        return () => {
            // console.log("clean up random")

            setFDdata({
                uid: !auth.user.uid ? "" : auth.user.uid,
                userName: !auth.user.uid ? "" : auth.user.displayName,
                email: !auth.user.uid ? "" : auth.user.email,

                loadTime: "",
                helpFull: "",
                howEasy: "",
                satisfaction: "",
                FDtype: "",
                message: ""
            })
        }
    }, [])


    const sendFeedBack = async () => {
        setShow(false)
        if (FDdata.loadTime !== "") {
            if (FDdata.email !== "") {
                await db.collection("FeedBacks")
                    .doc(FDdata.email)
                    .set(FDdata)
                    .then(() => {
                    })
            } else {
                await db.collection("FeedBacks")
                    .doc()
                    .set(FDdata)
                    .then(() => {
                    })
            }
        }
    };
    return (
        <>
            <div className="feedback">

                <button onClick={() => setShow(true)} className="btn feedback-btn" >FeedBack</button>
                <Popup
                    heading="FeedBack Time 😊"
                    btn="NOT_CLOSE"
                    show={show}
                    onClose={() => setShow(false)}
                >
                    <div>
                        <div className="flex flex-jc-sb flex-modile-col">
                            <Question
                                question="What do you feel about ​​Loading time of the site?"
                                id="loadTime"
                                name="loadTime"
                                value={FDdata.loadTime}
                                onChange={handleChange}
                            />
                            <Question
                                question="​​Do you feel our service is actually usefull ?"
                                id="helpFull"
                                name="helpFull"
                                value={FDdata.helpFull}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-jc-sb flex-modile-col">
                            <Question
                                question="How easy did we make it for you to solve your issue?"
                                id="howEasy"
                                name="howEasy"
                                value={FDdata.howEasy}
                                onChange={handleChange}
                            />
                            <Question
                                question=" How satisfied are you with our services?"
                                id="satisfaction"
                                name="satisfaction"
                                value={FDdata.satisfaction}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-jc-sb flex-modile-col">

                            <Question
                                question="What feature/option could we add to make your experience better? "
                                id="FDtype"
                                name="FDtype"
                                value={FDdata.FDtype}
                                options={["Bug/Issues", "Suggetion", "Other"]}
                                style={{ width: "100%" }}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <InputSelect
                        label="Feedback"
                    >
                        <textarea
                            name="message"
                            rows="5"
                            value={FDdata.message}
                            onChange={handleChange}
                        ></textarea>
                    </InputSelect>
                    <button className="btn" onClick={sendFeedBack} > save </button>
                </Popup>

            </div>
        </>
    )
}


export default FeedBack