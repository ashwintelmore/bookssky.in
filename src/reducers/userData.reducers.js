import { authConstant, userDataConstant } from "../actions/constant";

const initialState = {
    userData: {},
    messege: "",
    isEmpty: true,
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case userDataConstant.UPDATE_USER_Data_REQUEST:
            state = {
                ...state,
                loading: true,
                messege:""
            }
            break;
        case userDataConstant.UPDATE_USER_Data_SUCCESS:
            state = {
                ...state,
                loading: false,
                userData: action.payload,
                isEmpty: false,
                messege: action.message
            }
            break;
        case userDataConstant.UPDATE_USER_Data_FAILUAR:
            state = {
                ...state,
                loading: false,
                messege: "Something went Wrong. Please Try Again"
            }
            break;
        //Get data
        case userDataConstant.GET_USER_Data_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case userDataConstant.GET_USER_Data_SUCCESS:
            state = {
                ...state,
                userData: action.payload,
                loading: false,
                isEmpty: false,
                messege: "Successfull Updated user Data"
            }
            break;
        case userDataConstant.GET_USER_Data_FAILUAR:
            state = {
                ...state,
                userData: {},
                loading: false,
                isEmpty: true,
                messege: "Something went Wrong. Please Try Again",
            }
            break;
        case userDataConstant.CLEAN_UP_USER_DATA:
            state = {
                ...state,
                userData: {},
                loading: false,
                isEmpty: true,
                messege: "Clean Up",
            }
            break;
        //If user logout then all field should be empty
        case authConstant.LOGOUT_SUCCESS:
            state = {
                ...state,
                userData: {},
                loading: false,
                isEmpty: true,
                messege: "",
            }
            break;
    }
    return state;
}