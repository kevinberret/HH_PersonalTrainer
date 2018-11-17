import ActionTypes from '../constants/actions-types';

//Define initial state for the store
export const initialState = {
    alert:{
      delete_link: '',
      open: false
    },
    snackbar:{
      open: false,
      message: '',
      variant: 'info',
    }
};

export default function utils(state = initialState, action){
  console.log(action.type);
    switch (action.type) {
        // ALERT
        case ActionTypes.OPEN_ALERT_REQ:
          return {
            ...state,
            alert: {
              open: true
            },
          };
        case ActionTypes.CLOSE_ALERT_REQ:
          return {
            ...state,
            alert: {
              open: false
            },
          }; 
        
        // SNACKBAR
        case ActionTypes.OPEN_SNACKBAR_REQ:
          return {
            ...state,
            snackbar: {
              ...state.snackbar,
              open: true
            },
          };

        case ActionTypes.CLOSE_SNACKBAR_REQ:
          return {
            ...state,
            snackbar: {
              ...state.snackbar,
              open: false
            },
          };

        case ActionTypes.SET_SNACKBAR_TEXT_REQ:
          return {
            ...state,
            snackbar: {
              ...state.snackbar,
              message: action.text
            }
          };

        case ActionTypes.RESET_SNACKBAR_TEXT_REQ:
          return {
            ...state,
            snackbar:{
              ...state.snackbar,
              message: ''
            }
          };

        case ActionTypes.SET_SNACKBAR_VARIANT_REQ:
          return {
            ...state,
            snackbar:{
              ...state.snackbar,
              variant: action.variant
            }
          };

        case ActionTypes.RESET_SNACKBAR_VARIANT_REQ:
          return {
            ...state,
            snackbar:{
              ...state.snackbar,
              variant: ''
            }
          }
        
        case ActionTypes.RESET_SNACKBAR_CONTENT_REQ:
          return {
            ...state,
            snackbar:{
              open: false,
              message: '',
              variant: ''
            }
          };

        default:
            return state;
    }
}