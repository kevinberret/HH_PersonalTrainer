import ActionTypes from '../constants/actions-types';

//Define initial state for the store
export const initialState = {
    list: [],
    listWithCustomers: [],
    isLoading: false,
    add_dialog_open: false,
    current: ''
};

export default function trainings(state = initialState, action){
  console.log(action);
    switch (action.type) {
        // FETCH ALL
        case ActionTypes.FETCH_ALL_TRAININGS_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.FETCH_ALL_TRAININGS_OK:
          return {
            ...state,
            list: action.list,
            isLoading: false,
          };
        case ActionTypes.FETCH_ALL_TRAININGS_ERR:
          return {
            ...state,
            isLoading: false,
          };
        
        // FETCH BY ID
        case ActionTypes.FETCH_TRAINING_BY_ID_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.FETCH_TRAINING_BY_ID_OK:
          return {
            ...state,
            current: action.current,
            isLoading: false,
          };
        case ActionTypes.FETCH_TRAINING_BY_ID_ERR:
          return{
            ...state,
            isLoading: false,
        };

        case ActionTypes.GET_TRAININGS_AND_CUSTOMERS_REQ:
          return {
            ...state,
            isLoading:true
          };

        case ActionTypes.GET_TRAININGS_AND_CUSTOMERS_OK:
          return {
            ...state,
            listWithCustomers: action.list,
            isLoading: false,
          };

        case ActionTypes.GET_TRAININGS_AND_CUSTOMERS_ERR:
          return {
            ...state,
            isLoading: false,
          };

        // SET TRAINING
        case ActionTypes.SET_CURRENT_TRAINING:
          return {
            ...state,
            current: action.link,
          };

        case ActionTypes.RESET_CURRENT_TRAINING:
          return {
            ...state,
            current: '',
          };

        // DELETE TRAINING
        case ActionTypes.DELETE_TRAINING_REQ:
          return {
            ...state,
            isLoading: true,
        };

        case ActionTypes.DELETE_TRAINING_OK:
          return {
            ...state,
            isLoading: false,
        };

        case ActionTypes.DELETE_TRAINING_ERR:
          return{
            ...state,
            isLoading: false,
        };

        // ADD TRAINING
        case ActionTypes.ADD_TRAINING_REQ:
          return {
            ...state,
            isLoading: true,
          };
        case ActionTypes.ADD_TRAINING_OK:
          return {
            ...state,
            isLoading: false,
          };
        case ActionTypes.ADD_TRAINING_ERR:
          return{
            ...state,
            isLoading: false,
          };

        case ActionTypes.OPEN_DIALOG_ADD_TRAINING_REQ:
          return {
            ...state,
            add_dialog_open: true,
          };

        case ActionTypes.CLOSE_DIALOG_ADD_TRAINING_REQ:
          return {
            ...state,
            add_dialog_open: false,
          };          

        default:
            return state;
    }
}