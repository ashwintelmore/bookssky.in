import { app } from '../../src/firebase/base';
import { reqBookConstants } from './constant';
import firebase from 'firebase';
const auth = app.auth();
const db = app.firestore();

//getAllBookRequestsSellerBook
export const getAllBookRequestsSellerBook = (user) => {
    return async (dispatch) => {
        dispatch({ type: reqBookConstants.GET_ALL_REQUESTS_REQUEST })
        await db
            .collection("requesters")
            .where("b_sellerUID", "==", user.b_sellerUID)
            .where("bookID", "==", user.bookID)
            .where("req_status", "==", true)
            .get()
            .then((doc) => {
                let _req = [];
                doc.docs.map(req => _req.push(req.data()))
                if (_req.length > 0) {
                    dispatch({
                        type: reqBookConstants.GET_ALL_REQUESTS_SUCCESS,
                        payload: _req
                    })
                }else{
                    dispatch({
                        type: reqBookConstants.GET_ALL_REQUESTS_FAILUAR,
                        payload: "NOT_FOUND"
                    })
                }
              

            }).catch((error) => {
                dispatch({
                    type: reqBookConstants.GET_ALL_REQUESTS_FAILUAR,
                    payload: "Something went wrong , please contact to support"
                })
            })
    }
}

export const getAllBookRequestsUser = (userID, loadMore) => {
    return async (dispatch) => {

        if (loadMore && Object.keys(loadMore).length > 0) {
            dispatch({ type: reqBookConstants.LOAD_MORE_REQUESTS_REQUEST })
            await db
                .collection("requesters")
                .where("requesterUID", "==", userID)
                .where("req_status", "==", true)
                .orderBy("CreatedAt" , "desc")
                .startAfter(loadMore.CreatedAt)
                .limit(4)
                .get()
                .then((doc) => {
                    let _req = [];
                    doc.docs.map(req => _req.push(req.data()))
                    if (_req.length > 0) {
                        dispatch({
                            type: reqBookConstants.LOAD_MORE_REQUESTS_SUCCESS,
                            payload: _req
                        })
                    }else{
                        dispatch({
                            type: reqBookConstants.LOAD_MORE_REQUESTS_FAILUAR,
                            payload: "NOT_FOUND"
                        })
                    }
                 
                }).catch((error) => {
                    dispatch({
                        type: reqBookConstants.LOAD_MORE_REQUESTS_FAILUAR,
                        payload: "Something went wrong , please contact to support"
                    })
                })
        } else {

            dispatch({ type: reqBookConstants.GET_ALL_REQUESTS_REQUEST })
            await db
                .collection("requesters")
                .where("requesterUID", "==", userID)
                .orderBy("CreatedAt" , "desc")
                .where("req_status", "==", true)
                .limit(4)
                .get()
                .then((doc) => {
                    let _req = [];
                    doc.docs.map(req => _req.push(req.data()))
                    if (_req.length > 0) {
                        
                        dispatch({
                            type: reqBookConstants.GET_ALL_REQUESTS_SUCCESS,
                            payload: _req
                        })
                    }else{
                        dispatch({
                            type: reqBookConstants.GET_ALL_REQUESTS_FAILUAR,
                            payload: "NOT_FOUND"
                        })

                    }
                }).catch((error) => {
                    console.log('error :>> ', error);
                    dispatch({
                        type: reqBookConstants.GET_ALL_REQUESTS_FAILUAR,
                        payload: "Something went wrong , please contact to support"
                    })
                })
        }
    }
}


export const CLEAN_UP_ALL_REQUESTS = () => {
    return async (dispatch) => {
        dispatch({
            type: reqBookConstants.CLEAN_UP_ALL_REQUESTS,
            payload: "CLEAN_UP"
        })
    }
}
