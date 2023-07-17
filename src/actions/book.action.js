import { app } from '../../src/firebase/base';
import { bookConstant } from './constant';
import firebase from 'firebase';
const db = app.firestore();
const storage = app.storage();

export const setBookForSell = (book, user) => {
    return async (dispatch) => {
        let _book = {
            id: book.id,
            b_sellerUID: book.b_sellerUID,//uid
            email: book.email,
            hide: book.hide,
            noOfRequest: book.noOfRequest,//number
            show_status: book.show_status,//boolean

            bTitle: book.bTitle,
            for_SCU: book.for_SCU,
            actualPrice: book.actualPrice,
            sellPrice: book.sellPrice,
            category: book.category,
            bType: book.bType,//PDF , Nots , other

            availableFor: book.availableFor,
            exchangeMassege: book.exchangeMassege,

            b_Images: book.b_Images,

            //Book description
            book_details: {
                qunatity: book.qunatity,
                auther: book.auther,
                discrib: book.discrib,
                lang: book.lang,
                noPages: book.noPages,
                publisher: book.publisher,
                publisherYEAR: book.publisherYEAR,
            }
        }
        dispatch({ type: bookConstant.SET_BOOK_REQUEST })
        if (book.id !== "") {
            //! Update the book
            const bookRef = await db.collection("all_books").doc(book.id);
            bookRef.update({
                ..._book,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((data) => {
                dispatch({
                    type: bookConstant.SET_BOOK_SUCCESS,
                    payload: _book
                })
            }).catch(error => {
                console.log('error :>> ', error);
                dispatch({
                    type: bookConstant.SET_BOOK_FAILUAR,
                    payload: error
                })
            })
        } else {
            // Create a new book
            const bookRef = await db.collection("all_books").doc();
            bookRef.set({
                ..._book,
                id: bookRef.id,
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((data) => {
                dispatch({
                    type: bookConstant.SET_BOOK_SUCCESS,
                    payload: { ..._book, id: bookRef.id }
                })
            }).catch(error => {
                dispatch({
                    type: bookConstant.SET_BOOK_FAILUAR,
                    payload: error
                })
            })
        }
    }
};
export const setBookNumberOfReq = (book, count) => {
    return async (dispatch) => {
        dispatch({ type: bookConstant.SET_BOOK_REQUEST })
        const bookRef = db.collection("all_books").doc(book.id);
        await bookRef.update({
            noOfRequest: count
        }).then((data) => {
            dispatch({
                type: bookConstant.SET_BOOK_SUCCESS,
                payload: book
            })
        }).catch(error => {
            console.log('error :>> ', error);
            dispatch({
                type: bookConstant.SET_BOOK_FAILUAR,
                payload: error
            })
        })
    }
};


export const deleteThisBook = (book) => {
    return async (dispatch) => {
        dispatch({
            type: bookConstant.DELETE_BOOK_REQUEST
        })
        await db.collection("all_books").doc(book.id).delete().then(() => {
            dispatch({
                type: bookConstant.DELETE_BOOK_SUCCESS,
            })
        }).catch(err => {
            dispatch({
                type: bookConstant.DELETE_BOOK_FAILUAR,
                payload: err
            })
        })
    }
}

export const CLEAN_UP_USER_DATA = () => {
    return async (dispatch) => {
        dispatch({
            type: bookConstant.CLEAN_UP_USER_DATA,
        })
    }
};

export const getUserBook = (bookId, whereFrom) => {
    return async (dispatch) => {
        dispatch({
            type: bookConstant.GET_BOOK_REQUEST
        })
        await db.collection("all_books").doc(bookId).get().then(doc => {
            if (!doc.exists) {
                dispatch({
                    type: bookConstant.GET_BOOK_FAILUAR,
                    payload: "NOT_FOUND",
                    whereFrom: whereFrom

                })
            } else {
                dispatch({
                    type: bookConstant.GET_BOOK_SUCCESS,
                    payload: doc.data(),
                    whereFrom: whereFrom
                })
            }
        }).catch(error => {
            console.log('error :>> ', error);
            dispatch({
                type: bookConstant.GET_BOOK_FAILUAR,
                payload: "Something went wrong; please contact to support",
                whereFrom: whereFrom

            })
        })

    }
};

export const NotForEdit = () => {
    return (dispatch) => {
        dispatch({
            type: bookConstant.IS_FOR_EDIT_OR_NOT
        })
    }
}

export const CLEAN_UP_BOOK = () => {
    return (dispatch) => {
        dispatch({
            type: bookConstant.CLEAN_UP_BOOK
        })
    }
}
