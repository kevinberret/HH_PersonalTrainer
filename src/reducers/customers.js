import ActionTypes from '../constants/actions-types';

//Define initial state for the store
export const initialState = {
    list: [],
    isLoading: false,
    add_dialog_open: false,
    current: ''
};

export default function customers(state = initialState, action){
  console.log(action);
    switch (action.type) {
        // FETCH ALL
        case ActionTypes.FETCH_ALL_CUSTOMERS_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.FETCH_ALL_CUSTOMERS_OK:
          return {
            ...state,
            list: action.list,
            isLoading: false,
          };
        case ActionTypes.FETCH_ALL_CUSTOMERS_ERR:
          return {
            ...state,
            isLoading: false,
          };
        
        // FETCH BY ID
        case ActionTypes.FETCH_CUSTOMER_BY_ID_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.FETCH_CUSTOMER_BY_ID_OK:
          return {
            ...state,
            current: action.current,
            isLoading: false,
          };
        case ActionTypes.FETCH_CUSTOMER_BY_ID_ERR:
          return{
            ...state,
            isLoading: false,
        };

        // SET CUSTOMER
        case ActionTypes.SET_CURRENT_CUSTOMER:
          return {
            ...state,
            current: action.link,
          };

        case ActionTypes.RESET_CURRENT_CUSTOMER:
          return {
            ...state,
            current: '',
          };

        // DELETE CUSTOMER
        case ActionTypes.DELETE_CUSTOMER_REQ:
          return {
            ...state,
            isLoading: true,
        };

        case ActionTypes.DELETE_CUSTOMER_OK:
          return {
            ...state,
            isLoading: false,
        };

        case ActionTypes.DELETE_CUSTOMER_ERR:
          return{
            ...state,
            isLoading: false,
        };

        // ADD CUSTOMER
        case ActionTypes.ADD_CUSTOMER_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.ADD_CUSTOMER_OK:
          return {
            ...state,
            isLoading: false,
          };
        case ActionTypes.ADD_CUSTOMER_ERR:
          return{
            ...state,
            isLoading: false,
          };

        case ActionTypes.OPEN_DIALOG_ADD_CUSTOMER_REQ:
          return {
            ...state,
            add_dialog_open: true,
          };

        case ActionTypes.CLOSE_DIALOG_ADD_CUSTOMER_REQ:
          return {
            ...state,
            add_dialog_open: false,
          };          

        default:
            return state;
    }
}