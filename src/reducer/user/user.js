import {extend} from "../utils.js";
import {userAdapter} from "../../adapters/user-adapter.js";
import {AuthStatus} from "../../const.js";

const initialState = {
  user: {
    id: 0,
    email: ``,
    name: ``,
    avatarUrl: ``,
  },
  authStatus: AuthStatus.NO_AUTH,
  authError: false,
};

const ActionType = {
  REQUIRE_AUTH: `REQUIRE_AUTH`,
  SET_AUTH_ERROR: `SET_ERROR`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const ActionCreator = {
  requireAuth: (status) => {
    return {
      type: ActionType.REQUIRE_AUTH,
      payload: status,
    };
  },

  setAuthError: (error) => {
    return {
      type: ActionType.SET_AUTH_ERROR,
      payload: error,
    };
  },

  setUserData: (userData) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => dispatch(ActionCreator.requireAuth(AuthStatus.NO_AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.setAuthError(false));
      dispatch(ActionCreator.requireAuth(AuthStatus.AUTH));
      dispatch(ActionCreator.setUserData(userAdapter(response.data)));
    })
    .catch((err) => {
      dispatch(ActionCreator.setAuthError(true));
      throw err;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTH:
      return extend(state, {
        authStatus: action.payload,
      });

    case ActionType.SET_AUTH_ERROR:
      return extend(state, {
        authError: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        user: action.payload,
      });

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
