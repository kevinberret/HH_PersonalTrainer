import ActionType from '../constants/actions-types';

export const openAlert_REQ = (values) => (
    {
        type: ActionType.OPEN_ALERT_REQ,
    }
);

export const closeAlert_REQ = () => (
    {
        type: ActionType.CLOSE_ALERT_REQ,
    }
);

export const openSnackbar_REQ = () => (
    {
        type: ActionType.OPEN_SNACKBAR_REQ,
    }
);

export const setSnackbarText_REQ = (text) => (
    {
        type: ActionType.SET_SNACKBAR_TEXT_REQ,
        text: text
    }
);

export const resetSnackbarText_REQ = () => (
    {
        type: ActionType.RESET_SNACKBAR_TEXT_REQ
    }
);

export const setSnackbarVariant_REQ = (variant) => (
    {
        type: ActionType.SET_SNACKBAR_VARIANT_REQ,
        variant: variant
    }
);

export const resetSnackbarVariant_REQ = () => (
    {
        type: ActionType.RESET_SNACKBAR_VARIANT_REQ,
    }
);

export const resetSnackbarContent_REQ = () => (
    {
        type: ActionType.RESET_SNACKBAR_CONTENT_REQ,
    }
);

export const closeSnackbar_REQ = () => (
    {
        type: ActionType.CLOSE_SNACKBAR_REQ,
    }
);

// functions
export function openAlert(){
    return async(dispatch, getState) => {
        dispatch(openAlert_REQ());
    }
}

export function closeAlert(){
    return async(dispatch, getState) => {
        dispatch(closeAlert_REQ());
    }
}

export function openSnackbar(){
    return async(dispatch, getState) => {
        dispatch(openSnackbar_REQ());
    }
}

export function setSnackbarText(text){
    console.log(text);
    return async(dispatch, getState) => {
        dispatch(setSnackbarText_REQ(text));
    }
}

export function resetSnackbarText(){
    return async(dispatch, getState) => {
        dispatch(resetSnackbarText_REQ());
    }
}

export function setSnackbarVariant(variant){
    console.log(variant);
    return async(dispatch, getState) => {
        dispatch(setSnackbarVariant_REQ(variant));
    }
}

export function resetSnackbarVariant(){
    return async(dispatch, getState) => {
        dispatch(resetSnackbarVariant_REQ());
    }
}

export function resetSnackbarContent(){
    return async(dispatch, getState) => {
        dispatch(resetSnackbarContent_REQ());
    }
}

export function closeSnackbar(){
    return async(dispatch, getState) => {
        //dispatch(resetSnackbarContent_REQ());
        dispatch(closeSnackbar_REQ());
    }
}