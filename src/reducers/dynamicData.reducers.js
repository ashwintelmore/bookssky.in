import { bookCatConstant } from "../actions/constant";

const initialState = {
    books_cat: [],
    loading: false,
    message: "",
    isEmpty:true,
    error: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case bookCatConstant.GET_BOOK_CAT_REQUEST:
            state = {
                ...state,
                loading: true,
                isEmpty:true
            }
            break;
        case bookCatConstant.GET_BOOK_CAT_SUCCESS:
            state = {
                ...state,
                books_cat: action.payload,
                loading: false,
                message: "SUCCESS",
                isEmpty:false,
                error: {},
            }
            break;
        case bookCatConstant.GET_BOOK_CAT_FAILUAR:
            state = {
                ...state,
                books_cat: {},
                loading: false,
                isEmpty:true,
                message: action.payload,
                error: {},
            }
            break;
        case bookCatConstant.CLEAN_UP_CAT:
            state = {
                ...state,
                books_cat: {},
                loading: false,
                isEmpty:true,
                message: action.payload,
                error: {},
            }
            break;
        default:
            break;
    }
    return state;
}