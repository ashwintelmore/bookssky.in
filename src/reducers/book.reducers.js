import { bookCatConstant, bookConstant } from "../actions/constant";

const initialState = {
    currentBook: {},
    loading: false,
    message: "",
    isUpdateSuccess: false,
    isEmpty: true,
    whereFrom: "",
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        //! Set the book
        case bookConstant.SET_BOOK_REQUEST:
            state = {
                ...state,
                loading: true,
                isEmpty: true,
                whereFrom: "",
                isUpdateSuccess: false

            }
            break;
        case bookConstant.SET_BOOK_SUCCESS:
            state = {
                ...state,
                currentBook: action.payload,
                error: {},
                loading: false,
                isEmpty: false,
                whereFrom: "",
                isUpdateSuccess: true
            }
            break;
        case bookConstant.SET_BOOK_FAILUAR:
            state = {
                ...state,
                currentBook: {},
                loading: false,
                error: action.payload,
                isEmpty: true,
                whereFrom: "",

                isUpdateSuccess: false
            }
            break;
        //! GEt a book
        case bookConstant.GET_BOOK_REQUEST:
            state = {
                ...state,
                currentBook: {},
                loading: true,
                isEmpty: true,
                whereFrom: "",

                isForEditBook: true
            }
            break;
        case bookConstant.GET_BOOK_SUCCESS:
            state = {
                ...state,
                currentBook: action.payload,
                error: {},
                isEmpty: false,
                whereFrom: "",
                whereFrom: action.whereFrom,
                loading: false,
            }
            break;
        case bookConstant.GET_BOOK_FAILUAR:
            state = {
                ...state,
                currentBook: {},
                isEmpty: true,
                loading: false,
                whereFrom: "",

                error: action.payload
            }
            break;
        // ! Not For edit
        case bookConstant.IS_FOR_EDIT_OR_NOT:
            state = {
                ...state,
                currentBook: {},
                error: {},
                isEmpty: true,
                isForEditBook: false,
                whereFrom: "",

                loading: false,
            }
            break;
        // ! Delete book
        case bookConstant.DELETE_BOOK_REQUEST:
            state = {
                ...state,
                loading: true,
                whereFrom: "",

                isUpdateSuccess: false
            }
        case bookConstant.DELETE_BOOK_SUCCESS:
            state = {
                ...state,
                loading: false,
                currentBook: {},
                isForEditBook: false,
                error: {},
                isUpdateSuccess: true,
                whereFrom: "",

            }
            break;
        case bookConstant.DELETE_BOOK_FAILUAR:
            state = {
                ...state,
                loading: false,
                error: action.payload,
                isUpdateSuccess: false,
                whereFrom: "",

            }
            break;
        //! Make empty
        case bookConstant.CLEAN_UP_BOOK:
            state = {
                ...state,
                currentBook: {},
                error: {},
                isEmpty: true,
                whereFrom: "",

                loading: false,
            }
            break;
        default:
            break;
    }
    return state;
}