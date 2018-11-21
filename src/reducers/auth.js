import ActionTypes from "../constants/actions-types";

export default (state = false, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER:
      return action.payload || null;
    default:
      return state;
  }
};