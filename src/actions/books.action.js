import { app } from '../../src/firebase/base';
import { booksConstant } from './constant';
const db = app.firestore();

export const getUserAllBooks = (user, lastDoc) => {
    return async (dispatch) => {

        if (lastDoc && Object.keys(lastDoc).length > 0) {
            dispatch({
                type: booksConstant.LOAD_MORE_USER_BOOKS_REQUEST,
                whereFrom:"USER_ALL_BOOKS"
            })
            const doc = await db.collection("all_books")
                .where("b_sellerUID", '==', user.uid)
                .orderBy("CreatedAt", "desc")
                .startAfter(lastDoc.CreatedAt)
                .limit(4)
                .get();
            const temp = [];
            doc.docs.map(doc => temp.push(doc.data()))
            if (temp.length > 0) {
                dispatch({
                    type: booksConstant.LOAD_MORE_USER_BOOKS_SUCCESS,
                    payload: temp,
                    whereFrom:"USER_ALL_BOOKS"
                })
            } else {
                dispatch({
                    type: booksConstant.LOAD_MORE_USER_BOOKS_FAILUAR,
                    payload: "NOT_FOUND",
                    whereFrom:"USER_ALL_BOOKS"
                })
            }
        } else {
            dispatch({
                type: booksConstant.GET_BOOKS_REQUEST
            })
            const doc = await db.collection("all_books")
                .where("b_sellerUID", '==', user.uid)
                .orderBy("CreatedAt", "desc")
                .limit(4)
                .get();
            const temp = [];
            doc.docs.map(doc => temp.push(doc.data()))
            if (temp.length > 0) {
                dispatch({
                    type: booksConstant.GET_BOOKS_SUCCESS,
                    payload: temp
                })
            } else {
                dispatch({
                    type: booksConstant.GET_BOOKS_FAILUAR,
                    payload: "something went wrong"
                })
            }
        }
    }
};
export const getUserAllExchangeBooks = (user) => {
    return async (dispatch) => {

        dispatch({
            type: booksConstant.GET_BOOKS_REQUEST
        })
        const doc = await db.collection("all_books")
            .where("b_sellerUID", '==', user.uid)
            .where("availableFor", '==', "exchange")
            .orderBy("CreatedAt", "desc")
            .get();
        const temp = [];
        doc.docs.map(doc => temp.push(doc.data()))
        if (temp.length > 0) {
            dispatch({
                type: booksConstant.GET_BOOKS_SUCCESS,
                payload: temp
            })
        } else {
            dispatch({
                type: booksConstant.GET_BOOKS_FAILUAR,
                payload: "something went wrong"
            })
        }
    }
};

export const getAllBooks = (books_cat) => {
    return async (dispatch) => {

        const tempFunTOGetAllBooks = (cat) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const doc = await db.collection("all_books")
                        .where("category", '==', cat.id)
                        .where("hide", "==", false)
                        .where("show_status", "==", true)
                        .limit(4)
                        .get();
                    const temp = [];
                    doc.docs.map(doc => temp.push(doc.data()))
                    if (temp.length > 0) {
                        resolve(temp);
                    } else {
                        resolve(temp)
                    }
                } catch (error) {
                    resolve(false)
                }
            })
        };

        let temp_allBooks = [];
        dispatch({
            type: booksConstant.GET_ALL_BOOKS_REQUEST,
            payload: "something went wrong"
        })
        for (const cat of books_cat) {
            let one_cat_all_books = await tempFunTOGetAllBooks(cat);
            if (!one_cat_all_books) {
                dispatch({
                    type: booksConstant.GET_ALL_BOOKS_FAILUAR,
                    payload: "something went wrong"
                })
                break
            }
            temp_allBooks.push(one_cat_all_books)
        }

        if (temp_allBooks.length > 0) {
            dispatch({
                type: booksConstant.GET_ALL_BOOKS_SUCCESS,
                payload: temp_allBooks,
                whereFrom: "HOME_BOOKS"

            })
        } else {
            dispatch({
                type: booksConstant.GET_ALL_BOOKS_FAILUAR,
                payload: "Async Problem ; please contact to support"
            })
        }
    }
};

export const CLEAN_UP_BOOKS_DATA = () => {
    return async (dispatch) => {
        dispatch({
            type: booksConstant.CLEAN_UP_BOOKS_DATA,
        })
    }
};
//not used yet
export const getAllBooksByCategory = (searchInput, loadMore) => {

    return (dispatch) => {
        const searchingPagination = async (category, searchInput, loadMore) => {
            if (loadMore && loadMore.length > 0) {
                let lastDoc = loadMore[loadMore.length - 1];
                try {
                    dispatch({
                        type: booksConstant.LOAD_MORE_BOOKS_REQUEST,
                        whereFrom: "CATEGORY"
                    })
                    const doc = await db.collection("all_books")
                        .where(category, '==', searchInput.uniqueName)
                        .where("show_status", "==", true)
                        .orderBy("id", "desc")
                        .limit(4)
                        .startAfter(lastDoc.id)
                        .get();
                    const temp2 = [];
                    doc.docs.map(doc => temp2.push(doc.data()))
                    if (temp2.length > 0) {
                        dispatch({
                            type: booksConstant.LOAD_MORE_BOOKS_SUCCESS,
                            payload: temp2,
                            whereFrom: "CATEGORY"
                        })
                    } else {
                        dispatch({
                            type: booksConstant.LOAD_MORE_BOOKS_FAILUAR,
                            payload: "NOT_FOUND",
                            whereFrom: "CATEGORY"
                        })
                    }
                } catch (error) {
                    console.log('error :>> ', error);
                    dispatch({
                        type: booksConstant.LOAD_MORE_BOOKS_FAILUAR,
                        payload: "Something went worng"
                    })
                }
            } else {

                try {
                    dispatch({
                        type: booksConstant.GET_ALL_BOOKS_REQUEST,
                    })
                    const doc = await db.collection("all_books")
                        .where(category, '==', searchInput.uniqueName)
                        .where("show_status", "==", true)
                        .limit(4)
                        .orderBy("id", "desc")
                        .get();
                    const temp = [];
                    doc.docs.map(doc => temp.push(doc.data()))
                    if (temp.length > 0) {
                        dispatch({
                            type: booksConstant.GET_ALL_BOOKS_SUCCESS,
                            payload: temp,
                            whereFrom: "CATEGORY"
                        })
                    } else {
                        dispatch({
                            type: booksConstant.GET_ALL_BOOKS_FAILUAR,
                            payload: "NOT_FOUND",
                            whereFrom: "CATEGORY"
                        })
                    }
                } catch (error) {
                    console.log('error :>> ', error);
                    dispatch({
                        type: booksConstant.GET_ALL_BOOKS_FAILUAR,
                        payload: "Something went worng"
                    })
                }
            }

        };
        if (searchInput.searchBy === "category") {
            searchingPagination("category", searchInput, loadMore)
        }
        if (searchInput.searchBy === "type") {

            searchingPagination("bType", searchInput, loadMore)
        }
    }
};

