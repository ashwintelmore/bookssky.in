import { reqBookConstants } from "../actions/constant";

const initialState = {
    all_requests: [],
    loading: false,
    message: "",
    isEmpty: true,
    error: {},
    loadingMoreRequests:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case reqBookConstants.GET_ALL_REQUESTS_REQUEST:
            state = {
                ...state,
                all_requests: [],
                error: {},
                message: "",
                isEmpty: true,
                loading: true,
            }
            break;
        case reqBookConstants.GET_ALL_REQUESTS_SUCCESS:
            state = {
                ...state,
                all_requests: action.payload,
                error: {},
                message: "",
                isEmpty: false,
                loading: false,
            }
            break;
        case reqBookConstants.GET_ALL_REQUESTS_FAILUAR:
            state = {
                ...state,
                all_requests: [],
                error: {},
                message: "",
                isEmpty: true,
                loading: false,
            }
            break;
        //! Load more requests
        case reqBookConstants.LOAD_MORE_REQUESTS_REQUEST:
            state = {
                ...state,
                all_requests: [...state.all_requests],
                error: {},
                message: "",
                loadingMoreRequests: true,
            }
            break;
        case reqBookConstants.LOAD_MORE_REQUESTS_SUCCESS:
            state = {
                ...state,
                all_requests: [...state.all_requests, ...action.payload],
                error: {},
                message: "",
                isEmpty: false,
                loadingMoreRequests: false,
            }
            break;
        case reqBookConstants.LOAD_MORE_REQUESTS_FAILUAR:
            state = {
                ...state,
                all_requests: [...state.all_requests],
                error: {},
                message: action.payload,
                loadingMoreRequests: false,
            }
            break;
            //! Clean up
        case reqBookConstants.CLEAN_UP_ALL_REQUESTS:
            state = {
                ...state,
                all_requests: [],
                error: {},
                message: "CLEAN_UP",
                isEmpty: true,
                loading: false,
            }
            break;
        default:
            break;
    }
    return state;
}
