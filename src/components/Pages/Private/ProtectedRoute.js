import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
/**
* @author
* @function ProtectedRoute
**/

const ProtectedRoute = ({
    component: Component,
    path,
    ...rest
}) => {
    const auth = useSelector(state => state.auth)
    const loginState = localStorage.getItem("loginstate");
    return (
        <Route {...rest} component={(props) => (
            loginState ?
                auth.user.emailVerified ?
                    (
                        <Component  {...props} />
                    )
                    :
                    (
                        <Redirect
                            to={{
                                pathname: "/confirmation",
                                state: { from: props.location }
                            }}
                        />
                    )
                :
                (
                    <Redirect
                        to={{
                            pathname: "/notlogin",
                            state: { from: props.location }
                        }}
                    />
                )
        )} />
    )
}
// const ProtectedRoute = ({
//     component: Component,
//     isAuth: isAuth,
//     path,
//     render,
//     ...rest
// }) => {
//     const auth = useSelector(state => state.auth);
//     console.log('auth :>> ', auth);
//     console.log('isAuth :>> ', isAuth);
//     console.log('rest :>> ', rest);
//     console.log(render)

//     return (
//         <Route
//             path={path}
//             {...rest}
//             render={(props) => {
//                 if (isAuth.isUserLogin) {
//                     return Component ? <Component {...props} /> : render(props);
//                 }
//                 return
//                 (
//                     <Redirect
//                         to={{
//                             pathname: "/notlogin",
//                             state: { from: props.location }
//                         }} />
//                 )
//             }} />
//     )
// }




// const HideConfirmation = ({
//     component: Component,
//     path,
//     ...rest
// }) => {
//     return (
//         <Route {...rest} component={(props) => (
//             auth.isUserLogin && auth.user.emailVerified ?
//                 (
//                     <Redirect to={{
//                         pathname: rest.location.state === undefined ? "/" : rest.location.state.from.pathname,
//                         state: { from: props.location }
//                     }} />
//                 )
//                 :
//                 (
//                     <Component {...rest}  {...props} />
//                 )

//         )} />
//     )
// }

const AfterLoginRoute = ({
    component: Component,
    path,
    isAuth: isAuth,
    ...rest
}) => {
    const loginState = localStorage.getItem("loginstate");
    const auth = useSelector(state => state.auth)
    return (
        <Route {...rest} component={(props) => (
            loginState ?
                auth.user.emailVerified ?
                    (
                        <Redirect to={{
                            pathname: "/profile/userallbooks",
                            state: { from: props.location }
                        }} />
                    )
                    :
                    (
                        <Redirect to={{
                            pathname: "/confirmation",
                            state: { from: props.location }
                        }} />
                    )
                :
                (
                    <Component {...props} />
                )
        )} />
    )
}



// const AfterLoginRoute = ({
//     component: Component,
//     path,
//     ...rest
// }) => {
//     const auth = useSelector(state => state.auth);
//     console.log('path :>> ', path);
//     console.log('rest :>> ', rest);
//     return (
//         <Route {...rest} component={(props) => (
//             auth.isUserLogin ?

//                 (
//                     <Redirect to={{
//                         pathname: rest.location.state === undefined ? "/" : rest.location.state.from.pathname,
//                         state: { from: props.location }
//                     }} />
//                 )
//                 :
//                 (
//                     <Component {...props} />
//                 )
//         )} />
//     )
// }


export default ProtectedRoute;
export { AfterLoginRoute }