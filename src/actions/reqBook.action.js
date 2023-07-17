import { app } from '../../src/firebase/base';
import { reqBookConstants } from './constant';
import firebase from 'firebase';
const auth = app.auth();
const db = app.firestore();


export const setBookRequests = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: reqBookConstants.SET_REQ_BOOK_DATA_REQUEST })
        if (reqData.id !== "") {
            const reqRef = db.collection("requesters")
                .doc(reqData.id)
            //! update the requests collection
            await reqRef.update({
                ...reqData,
                req_status: !reqData.req_status,
                price: reqData.req_status ? "" : reqData.price,
                UpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((data) => {
                dispatch({
                    type: reqBookConstants.SET_REQ_BOOK_DATA_SUCCESS,
                    payload: {
                        ...reqData,
                        req_status: !reqData.req_status,
                        price: reqData.req_status ? "" : reqData.price,
                        UpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }
                })
            }).catch((error) => {
                console.log("error", error)
                dispatch({
                    type: reqBookConstants.SET_REQ_BOOK_DATA_FAILUAR,
                    payload: "Something went wrong , please contact to support"
                })
            })
        } else {
            const reqRef = db.collection("requesters").doc()
            await reqRef.set({
                ...reqData,
                id: reqRef.id,
                req_status: true,
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((data) => {
                dispatch({
                    type: reqBookConstants.SET_REQ_BOOK_DATA_SUCCESS,
                    payload: {
                        ...reqData,
                        id: reqRef.id,
                        req_status: true,
                    }
                })
            }).catch((error) => {
                console.log("error", error)
                dispatch({
                    type: reqBookConstants.SET_REQ_BOOK_DATA_FAILUAR,
                    payload: "Something went wrong , please contact to support"
                })
            })
        }
    }
}

export const getBookRequestReqBook = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: reqBookConstants.GET_BOOK_REQUESTS_REQUEST })
        await db.collection("requesters")
            .where("bookID", "==", reqData.bookID)
            .where("requesterUID", "==", reqData.requesterUID)
            .get()
            .then((doc) => {

                let reqTemp = {};
                doc.docs.map(r => reqTemp = { ...r.data() })
                if (Object.keys(reqTemp).length > 0) {
                    dispatch({
                        type: reqBookConstants.GET_BOOK_REQUESTS_SUCCESS,
                        payload: reqTemp
                    })
                } else {
                    dispatch({
                        type: reqBookConstants.GET_BOOK_REQUESTS_FAILUAR,
                        payload: "NOT_FOUND"
                    })
                }
            }).catch((error) => {
                console.log('error :>> ', error);
                dispatch({
                    type: reqBookConstants.GET_BOOK_REQUESTS_FAILUAR,
                    payload: "Something went wrong , please contact to support"
                })
            })
    }
}


export const CLEAN_UP_REQUESTS = () => {
    return async (dispatch) => {
        dispatch({
            type: reqBookConstants.CLEAN_UP_REQUESTS,
            payload: "CLEAN_UP"
        })
    }
}
