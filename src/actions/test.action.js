import { ConstantTest } from "./constant"

export const testAction = ()=>{
    return (dispatch)=>{
        dispatch({
            type:ConstantTest.test,
            payload:{
                test : "changed"
            }
        })
    }
}