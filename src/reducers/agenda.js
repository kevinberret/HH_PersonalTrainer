import ActionTypes from '../constants/actions-types';

//Define initial state for the store
export const initialState = {
    events:[],
    isLoading:false,
};

export default function agenda(state = initialState, action){
  console.log(action.type);
    switch (action.type) {
        // EVENTS
        case ActionTypes.GET_EVENTS_REQ:
          return {
            ...state,
            isLoading: true
          };
        case ActionTypes.GET_EVENTS_OK:
          return {
            ...state,
            events: action.events,            
            isLoading:false
          };

          case ActionTypes.GET_EVENTS_ERR:
          return {
            ...state,
            isLoading:false
          };
        
        default:
            return state;
    }
}