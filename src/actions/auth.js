import ActionType from '../constants/actions-types';
import { authRef, provider } from "../config/firebase";

// functions
export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: ActionType.FETCH_USER,
                payload: user
            });
        } else {
            dispatch({
                type: ActionType.FETCH_USER,
                payload: null
            });
        }
    });
};

export const signIn = () => dispatch => {
    authRef.signInWithPopup(provider)
        .then(result => {

        })
        .catch(error => {
            console.log(error);
        });
};

export const signOut = () => dispatch => {
    authRef.signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch(error => {
            console.log(error);
        });
};