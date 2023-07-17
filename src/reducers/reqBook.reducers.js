import { reqBookConstants } from "../actions/constant";

const initialState = {
    reqBook: {},
    loading: false,
    message: "",
    isEmpty: true,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        //! Set Data
        case reqBookConstants.SET_REQ_BOOK_DATA_REQUEST:
            state = {
                ...state,
                error: {},
                message: "fetching...",
                isEmpty: true,
                loading: true,
            }
            break;
        case reqBookConstants.SET_REQ_BOOK_DATA_SUCCESS:
            state = {
                ...state,
                reqBook: action.payload,
                message: "successfully fetches",
                error: {},
                isEmpty: false,
                loading: false,
            }
            break;
        case reqBookConstants.SET_REQ_BOOK_DATA_FAILUAR:
            state = {
                ...state,
                reqBook: {},
                message: "",
                error: action.payload,
                isEmpty: true,
                loading: false,
            }
            break;

        //! Get the of one requests 
        case reqBookConstants.GET_BOOK_REQUESTS_REQUEST:
            state = {
                ...state,
                reqBook: {},
                error: {},
                message: "",
                isEmpty: true,
                loading: true,
            }
            break;
        case reqBookConstants.GET_BOOK_REQUESTS_SUCCESS:
            state = {
                ...state,
                reqBook: action.payload,
                error: {},
                message: "",
                isEmpty: false,
                loading: false,
            }
            break;
        case reqBookConstants.GET_BOOK_REQUESTS_FAILUAR:
            state = {
                ...state,
                reqBook: {},
                error: {},
                message: "",
                isEmpty: true,
                loading: false,
            }
            break;
        //! Clean tha state
        case reqBookConstants.CLEAN_UP_REQUESTS:
            state = {
                ...state,
                reqBook: {},
                error: {},
                message: action.payload,
                isEmpty: true,
            }
            break;
        default:
            break;
    }
    return state;
}
