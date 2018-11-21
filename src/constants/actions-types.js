// fetch customers

export const ADD_CUSTOMER = "ADD_CUSTOMER";

const ActionTypes = {
    //
    // CUSTOMERS
    //
    FETCH_ALL_CUSTOMERS_REQ: "FETCH_ALL_CUSTOMERS_REQ",
    FETCH_ALL_CUSTOMERS_OK: "FETCH_ALL_CUSTOMERS_OK",
    FETCH_ALL_CUSTOMERS_ERR: "FETCH_ALL_CUSTOMERS_ERR",

    FETCH_CUSTOMER_BY_ID_REQ: "FETCH_CUSTOMER_BY_ID_REQ",
    FETCH_CUSTOMER_BY_ID_OK: "FETCH_CUSTOMER_BY_ID_OK",
    FETCH_CUSTOMER_BY_ID_ERR: "FETCH_CUSTOMER_BY_ID_ERR",

    ADD_CUSTOMER_REQ: "ADD_CUSTOMER_REQ",
    ADD_CUSTOMER_OK: "ADD_CUSTOMER_OK",
    ADD_CUSTOMER_ERR: "ADD_CUSTOMER_ERR",

    EDIT_CUSTOMER_REQ: "EDIT_CUSTOMER_REQ",
    EDIT_CUSTOMER_OK: "EDIT_CUSTOMER_OK",
    EDIT_CUSTOMER_ERR: "EDIT_CUSTOMER_ERR",

    DELETE_CUSTOMER_REQ: "DELETE_CUSTOMER_REQ",
    DELETE_CUSTOMER_OK: "DELETE_CUSTOMER_OK",
    DELETE_CUSTOMER_ERR: "DELETE_CUSTOMER_ERR",

    SET_CURRENT_CUSTOMER: "SET_CURRENT_CUSTOMER",
    RESET_CURRENT_CUSTOMER: "RESET_CURRENT_CUSTOMER",

    OPEN_DIALOG_ADD_CUSTOMER_REQ: "OPEN_DIALOG_ADD_CUSTOMER_REQ",
    CLOSE_DIALOG_ADD_CUSTOMER_REQ: "CLOSE_DIALOG_ADD_CUSTOMER_REQ",

    OPEN_DIALOG_EDIT_CUSTOMER_REQ: "OPEN_DIALOG_EDIT_CUSTOMER_REQ",
    CLOSE_DIALOG_EDIT_CUSTOMER_REQ: "CLOSE_DIALOG_EDIT_CUSTOMER_REQ",

    //
    // TRAININGS
    //
    FETCH_ALL_TRAININGS_REQ: "FETCH_ALL_TRAININGS_REQ",
    FETCH_ALL_TRAININGS_OK: "FETCH_ALL_TRAININGS_OK",
    FETCH_ALL_TRAININGS_ERR: "FETCH_ALL_TRAININGS_ERR",

    FETCH_TRAINING_BY_ID_REQ: "FETCH_TRAINING_BY_ID_REQ",
    FETCH_TRAINING_BY_ID_OK: "FETCH_TRAINING_BY_ID_OK",
    FETCH_TRAINING_BY_ID_ERR: "FETCH_TRAINING_BY_ID_ERR",

    ADD_TRAINING_REQ: "ADD_TRAINING_REQ",
    ADD_TRAINING_OK: "ADD_TRAINING_OK",
    ADD_TRAINING_ERR: "ADD_TRAINING_ERR",

    DELETE_TRAINING_REQ: "DELETE_TRAINING_REQ",
    DELETE_TRAINING_OK: "DELETE_TRAINING_OK",
    DELETE_TRAINING_ERR: "DELETE_TRAINING_ERR",

    SET_CURRENT_TRAINING: "SET_CURRENT_TRAINING",
    RESET_CURRENT_TRAINING: "RESET_CURRENT_TRAINING",

    OPEN_DIALOG_ADD_TRAINING_REQ: "OPEN_DIALOG_ADD_TRAINING_REQ",
    CLOSE_DIALOG_ADD_TRAINING_REQ: "CLOSE_DIALOG_ADD_TRAINING_REQ",

    GET_TRAININGS_AND_CUSTOMERS_REQ: "GET_TRAININGS_AND_CUSTOMERS_REQ",
    GET_TRAININGS_AND_CUSTOMERS_OK: "GET_TRAININGS_AND_CUSTOMERS_OK",
    GET_TRAININGS_AND_CUSTOMERS_ERR: "GET_TRAININGS_AND_CUSTOMERS_ERR",

    // UTILS
    OPEN_ALERT_REQ: "OPEN_ALERT_REQ",
    CLOSE_ALERT_REQ: "CLOSE_ALERT_REQ",
    OPEN_SNACKBAR_REQ: "OPEN_SNACKBAR_REQ",
    SET_SNACKBAR_TEXT_REQ: "SET_SNACKBAR_TEXT_REQ",
    RESET_SNACKBAR_TEXT_REQ: "RESET_SNACKBAR_TEXT_REQ",
    SET_SNACKBAR_VARIANT_REQ: "SET_SNACKBAR_VARIANT_REQ",
    RESET_SNACKBAR_VARIANT_REQ: "RESET_SNACKBAR_VARIANT_REQ",
    RESET_SNACKBAR_CONTENT_REQ: "RESET_SNACKBAR_CONTENT_REQ",
    CLOSE_SNACKBAR_REQ: "CLOSE_SNACKBAR_REQ",

    // AGENDA
    GET_EVENTS_REQ: "GET_EVENTS_REQ",
    GET_EVENTS_OK: "GET_EVENTS_OK",
    GET_EVENTS_ERR: "GET_EVENTS_ERR",
};

export default ActionTypes;