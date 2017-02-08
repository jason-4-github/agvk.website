import _ from 'lodash';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_FROM_OPEN,
} from '../constants/ActionTypes';

const initialState = {
  isLoginFormOpen: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      const tmpState = _.cloneDeep(state);
      delete tmpState.isLoginPass;

      return {
        ...tmpState,
        ...action,
      };
    }
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LOGIN_FROM_OPEN:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default login;
