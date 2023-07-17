import { app } from '../../src/firebase/base';
import { authConstant, userDataConstant } from './constant';
import firebase from 'firebase';
import { messaging } from 'reactfire';
const db = app.firestore();

export const updateUserData = (userData) => {
    return async (dispatch) => {
        const _userData = {
            uid: userData.uid,
            hide: userData.hide,
            email: userData.email,
            displayName: userData.displayName,
            DOB: userData.DOB,
            photoURL: userData.photoURL,
            profile_percent: userData.profile_percent,
            address: {
                city: userData.city,
                fAddress: userData.fAddress,
                state: userData.state,
                pin: userData.pin,
            },
            social_Media: {
                insta: userData.insta,
                fb: userData.fb,
                twit: userData.twit,
                wApp: userData.wApp,
                linkDin: userData.linkDin,
                discord: userData.discord,
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        try {
            dispatch({ type: userDataConstant.UPDATE_USER_Data_REQUEST })
            //small data collection 
            await db.collection("userData").doc(userData.email).set({
                displayName: _userData.displayName,
                photoURL: _userData.photoURL,
                email: _userData.email,
                hide: _userData.hide,
                uid: _userData.uid,

                profile_percent: _userData.profile_percent
            }).then(() => {
                dispatch({
                    type: authConstant.USER_SOME_DATA_SUCCESS,
                    payload: {
                        displayName: _userData.displayName,
                        photoURL: _userData.photoURL,
                        // email: _userData.email,
                        profile_percent: _userData.profile_percent,
                    }
                })
            })
            //all data collection 
            await db.collection("userData").doc(userData.email).collection("allDetailsOfUser").doc(userData.email).set(_userData).then(() => {
                dispatch({
                    type: userDataConstant.UPDATE_USER_Data_SUCCESS,
                    payload: _userData,
                    message:"UPDATE_SUCCESS"
                })
            });
        } catch (error) {
            dispatch({
                type: userDataConstant.UPDATE_USER_Data_FAILUAR,
            })
            console.error("User data Error", error);
        }

    }
}

export const getUserData = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: userDataConstant.GET_USER_Data_REQUEST })
            const doc = await db.collection("userData").doc(user.email).collection("allDetailsOfUser").doc(user.email).get();
            if (!doc.exists) {
                dispatch({
                    type: userDataConstant.GET_USER_Data_FAILUAR,
                })
            } else {
                dispatch({
                    type: userDataConstant.GET_USER_Data_SUCCESS,
                    payload: doc.data()
                })
            }
        } catch (error) {
            dispatch({
                type: userDataConstant.GET_USER_Data_FAILUAR,
            })
        }
    }
}

// Not working this function 
export const getUserDataByUID = (userId) => {
    return async (dispatch) => {
        if (userId !== ("" || undefined)) {
            try {
                // dispatch({ type: userDataConstant.GET_USER_Data_REQUEST })
                const doc = await db
                    .collection("userData")
                    .where("uid", "==", userId)
                    .collection("allDetailsOfUser")
                    .where("uid", "==", userId)
                    .get();
                doc.docs.map(one => {
                })

                if (!doc.exists) {
                    console.log('No such document!');
                    // dispatch({
                    //     type: userDataConstant.GET_USER_Data_FAILUAR,
                    // })
                } else {
                    console.log("it its true part")
                    // dispatch({
                    //     type: userDataConstant.GET_USER_Data_SUCCESS,
                    //     payload: doc.data()
                    // })
                }
            } catch (error) {
                console.log('error :>> ', error);
                // dispatch({
                //     type: userDataConstant.GET_USER_Data_FAILUAR,
                // })
            }
        }
    }
}

export const CLEAN_UP_USER_DATA = (user) => {
    return async (dispatch) => {
        dispatch({
            type: userDataConstant.CLEAN_UP_USER_DATA
        })
    }
}

