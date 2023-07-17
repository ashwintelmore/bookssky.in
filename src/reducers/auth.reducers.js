import { authConstant } from "../actions/constant";

const initialState = {
    user: {
        profile_percent: 0,//TODO Change it
        emailVerified:true,
    },
    isUserLogin: false,
    loading: false,
    isEmpty: true,
    message: "",
    error: {},

    //Notlogin error solve
    // solveNotLoginErr : true
}

export default (state = initialState, action) => {
    switch (action.type) {
        //! Login user
        case authConstant.LOGIN_REQUEST:
            state = {
                ...state,
                user: { profile_percent: 0,},
                loading: true,
                // isUserLogin: true

            }
            break;
        case authConstant.LOGIN_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, ...action.payload },
                loading: false,
                isEmpty: false,//Not get all basic data
                message: "LOGIN_SUCCESS",
                error: {},
                // solveNotLoginErr:true,
                isUserLogin: true
            }
            break;
        case authConstant.LOGIN_FAILUAR:
            state = {
                ...state,
                error: action.payload,
                isEmpty: true,
                loading: false,
                // solveNotLoginErr:false,
                isUserLogin: false
                
            }
            break;
        //! SOme data of user
        case authConstant.USER_SOME_DATA_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstant.USER_SOME_DATA_SUCCESS:
            state = {
                ...state,
                user: { ...state.user, ...action.payload },
                loading: false,
                isEmpty: false,
                message: "Goted small data of user",
                error: {},
                // solveNotLoginErr:true,
                isUserLogin: true
            }
            break;
        case authConstant.USER_SOME_DATA_FAILUAR:
            state = {
                ...state,
                error: action.payload,
                isEmpty: true,
                loading: false
            }
            break;

        //! Logout
        case authConstant.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,
                error: {},
                isUserLogin: false
            }
            break;
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...state,
                user: {},
                loading: false,
                isEmpty: true,
                error: {},
                // solveNotLoginErr:false,
                message: "LOGOUT_SUCCESS",
                isUserLogin: false
            }
            break;
        case authConstant.LOGOUT_FAILUAR:
            state = {
                ...state,
                loading: false,
                message: "something went wrong",
                error: {},
            }
            break;
            //! Clean up auth
        case authConstant.CLEAN_UP_AUTH:
            state = {
                ...state,
                loading: false,
                error: {},
            }
            break;
        default:
            break;
    }
    return state;
}