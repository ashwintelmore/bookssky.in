import { app } from '../firebase/base';
import { bookCatConstant } from './constant';
import firebase from 'firebase';
const db = app.firestore();

export const getBookCategory = () => {
    return async (dispatch) => {
        dispatch({ type: bookCatConstant.GET_BOOK_CAT_REQUEST })
        const doc = await db.collection("categories").get();
        let temp = [];
        if (doc.docs.length > 0) {
            doc.docs.forEach(doc => {
                temp.push(doc.data());
            })
            dispatch({
                type: bookCatConstant.GET_BOOK_CAT_SUCCESS,
                payload: temp
            })
        } else{
            dispatch({
                type: bookCatConstant.GET_BOOK_CAT_FAILUAR,
                payload: "somthing went wrong. Try after sometime or contact support"
            })
        }
    }
}
export const timeTocleanUpCat = () => {
    return  (dispatch) => {
            dispatch({
                type: bookCatConstant.CLEAN_UP_CAT,
                payload: "CLEAN_UP"
            })
    }
}