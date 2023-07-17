import { booksConstant } from "../actions/constant";


const initialState = {
    User_All_books: [],
    all_books: [],
    loading: false,
    loadingMoreBooks:false,
    message: '',
    isEmpty: true,
    error: "",
    whereFrom: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case booksConstant.GET_BOOKS_REQUEST:
            state = {
                ...state,
                loading: true,
                message: "fetching the data from database",
                isEmpty: true,
                whereFrom: ""

            }
            break;
        case booksConstant.GET_BOOKS_SUCCESS:
            state = {
                ...state,
                User_All_books: action.payload,
                loading: false,
                message: "fetching SUCCESSFULL",
                isEmpty: false,
                whereFrom: action.whereFrom

            }
            break;
        case booksConstant.GET_BOOKS_FAILUAR:
            state = {
                ...state,
                loading: false,
                User_All_books: [],
                message: action.payload,
                isEmpty: true,
                whereFrom: ""

            }
            break;
            //! Load More books
        case booksConstant.LOAD_MORE_USER_BOOKS_REQUEST:
            state = {
                ...state,
                loadingMoreBooks: true,
                message: "fetching the more data from database",
                isEmpty: true,
                whereFrom: action.payload
            }
            break;
        case booksConstant.LOAD_MORE_USER_BOOKS_SUCCESS:
            state = {
                ...state,
                User_All_books:[ ...state.User_All_books , ...action.payload],
                loadingMoreBooks: false,
                message: "fetching SUCCESSFULL",
                isEmpty: false,
                whereFrom: action.whereFrom
            }
            break;
        case booksConstant.LOAD_MORE_USER_BOOKS_FAILUAR:
            state = {
                ...state,
                loadingMoreBooks: false,
                User_All_books: [...state.User_All_books],
                message: action.payload,
                isEmpty: true,
                whereFrom: action.whereFrom

            }
            break;
        //! Time to Change state
        case booksConstant.CLEAN_UP_BOOKS_DATA:
            state = {
                ...state,
                loading: false,
                User_All_books: [],
                all_books: [],
                message: action.payload,
                isEmpty: true,
                whereFrom: ""

            }
            break;
        //! get ALL books 
        case booksConstant.GET_ALL_BOOKS_REQUEST:
            state = {
                ...state,
                loading: true,
                all_books: [],
                message: action.payload,
                isEmpty: true,
                whereFrom: ""

            }
            break;
        case booksConstant.GET_ALL_BOOKS_SUCCESS:
            state = {
                ...state,
                loading: false,
                all_books: action.payload,
                whereFrom: action.whereFrom,
                message: "fetches all books",
                isEmpty: false,
            }
            break;
        case booksConstant.GET_ALL_BOOKS_FAILUAR:
            state = {
                ...state,
                loading: false,
                all_books: [],
                message: action.payload,
                isEmpty: true,
                whereFrom: action.whereFrom
            }
            break;
            //! Load more books
        case booksConstant.LOAD_MORE_BOOKS_REQUEST:
            state = {
                ...state,
                loadingMoreBooks: true,
                all_books: [...state.all_books],
                whereFrom: action.whereFrom,
                message: "fetches more books",
                isEmpty: true,

            }
            break;
        case booksConstant.LOAD_MORE_BOOKS_SUCCESS:
            state = {
                ...state,
                loadingMoreBooks: false,
                all_books: [...state.all_books, ...action.payload],
                whereFrom: action.whereFrom,
                message: "fetches more books",
                isEmpty: false,
            }
            break;
        case booksConstant.LOAD_MORE_BOOKS_FAILUAR:
            state = {
                ...state,
                loadingMoreBooks: false,
                all_books: [...state.all_books],
                whereFrom: action.whereFrom,
                message: action.payload,
                isEmpty: false,
            }
            break;

        default:
            break;
    }

    return state;
}