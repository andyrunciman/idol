import { LOGIN, LOGOUT } from './authConstants';
const authReducer = (state = {}, actions) => {
  switch (actions.type) {
    case LOGIN:
      return {
        isAuthenticated: true
      };
    case LOGOUT:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
