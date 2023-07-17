
import { app } from '../../src/firebase/base';
import { authConstant } from './constant';
const auth = app.auth();
const db = app.firestore();
export const RegisterUser = (_user) => {
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST })
        await auth.createUserWithEmailAndPassword(_user.email.trim(), _user.password.trim())
            .then(async (userCredential) => {
                var user = userCredential.user;
                const userData = {
                    uid: user.uid,
                    hide: false,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    emailVerified: user.emailVerified,
                }
                dispatch({ type: authConstant.USER_SOME_DATA_REQUEST })
                await auth.currentUser.updateProfile({
                    displayName: _user.displayName
                }).then((data) => {
                    dispatch({
                        type: authConstant.USER_SOME_DATA_SUCCESS,
                        payload: userData
                    })
                }).catch((error) => {
                    console.log('error :>> ', error);
                    dispatch({
                        type: authConstant.USER_SOME_DATA_FAILUAR,
                        payload: "Somthin went wrong"
                    })
                });


            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error :>> ', error);

                dispatch({
                    type: authConstant.LOGIN_FAILUAR,
                    payload: {
                        errorCode, errorMessage
                    }
                })
            });
    }
};

export const LoginUser = (_user) => {
    return async (dispatch) => {
        dispatch({ type: authConstant.LOGIN_REQUEST })


        await auth.signInWithEmailAndPassword(_user.email, _user.password)
            .then(async (userCredential) => {
                var user = userCredential.user;
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    emailVerified: user.emailVerified,
                }

                localStorage.setItem("loginstate", true)
                dispatch({
                    type: authConstant.LOGIN_SUCCESS,
                    payload: userData
                })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error :>> ', error);

                dispatch({
                    type: authConstant.LOGIN_FAILUAR,
                    payload: {
                        errorCode, errorMessage
                    }
                })
            });
    }
};

export const userLoginOrNOt = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstant.LOGIN_REQUEST,
        })
        await auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                    emailVerified: user.emailVerified,
                }
                if (userData.uid !== null) {
                    localStorage.setItem("loginstate", true)

                    dispatch({
                        type: authConstant.LOGIN_SUCCESS,
                        payload: userData
                    })
                    dispatch({ type: authConstant.USER_SOME_DATA_REQUEST })

                    const doc = await db.collection("userData").doc(userData.email).get();
                    if (!doc.exists) {
                        dispatch({
                            type: authConstant.USER_SOME_DATA_FAILUAR,
                            payload: "NOT_FOUND"
                        })
                    } else {
                        dispatch({
                            type: authConstant.USER_SOME_DATA_SUCCESS,
                            payload: doc.data()
                        })
                    }
                } else {
                    dispatch({
                        type: authConstant.LOGIN_FAILUAR,
                        payload: "NOT_FOUND"
                    })
                }

            } else {
                localStorage.removeItem("loginstate")
                dispatch({
                    type: authConstant.LOGOUT_SUCCESS,
                })
            }
        });
    }
};
export const userLogout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstant.LOGOUT_REQUEST,
        })
        await auth.signOut().then(() => {
            localStorage.removeItem("loginstate")
            dispatch({
                type: authConstant.LOGOUT_SUCCESS
            })
        }).catch(() => {
            dispatch({
                type: authConstant.LOGOUT_FAILUAR
            })
        })
    }
};
export const userDelet = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstant.LOGOUT_REQUEST,
        })
        const user = auth.currentUser;

        if (user !== null) {
            await user.delete().then(() => {
                localStorage.removeItem("loginstate")
                dispatch({
                    type: authConstant.LOGOUT_SUCCESS
                })
            }).catch((error) => {
                console.log('error :>> ', error);
                dispatch({
                    type: authConstant.LOGOUT_FAILUAR
                })
            })
        } else {
            dispatch({
                type: authConstant.LOGOUT_FAILUAR
            })
        }
    }
};
// export const mailVerification = () => {
//     return async (dispatch) => {
//         dispatch({
//             type: authConstant.LOGOUT_REQUEST,
//         })
//         const user = auth.currentUser;

//         if (user !== null) {
//          if (userData.emailVerified === false) {
//                     await auth.currentUser.sendEmailVerification()
//                         .then(() => {
//                             localStorage.setItem("loginstate", true)
//                             dispatch({
//                                 type: authConstant.LOGIN_SUCCESS,
//                                 payload: userData
//                             })
//                         }).catch((error) => {
//                             console.log('error :>> ', error);
//                         });
//                 } else {
//             dispatch({
//                 type: authConstant.LOGOUT_FAILUAR
//             })
//         }
//     }
// };


export const CLEAN_UP_AUTH = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstant.CLEAN_UP_AUTH,
        })
    }
};


