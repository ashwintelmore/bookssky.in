import { ConstantTest } from "../actions/constant";

const initialState = {
    test: "ok"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ConstantTest.test:
            state = {
                ...state,
                test:action.payload.test
            }
            break;

        default:
            break;
    }
    return state;
}