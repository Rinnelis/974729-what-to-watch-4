import {extend} from "../utils.js";
import {userAdapter} from "../../adapters/user-adapter.tsx";
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
  isAuthInProgress: false,
};

const ActionType = {
  REQUIRE_AUTH: `REQUIRE_AUTH`,
  SET_AUTH_ERROR: `SET_ERROR`,
  SET_USER_DATA: `SET_USER_DATA`,
  SET_PROGRESS_STATUS: `SET_PROGRESS_STATUS`,
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

  setProgressStatus: (status) => {
    return {
      type: ActionType.SET_PROGRESS_STATUS,
      payload: status,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.setProgressStatus(true));
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthError(false));
        dispatch(ActionCreator.requireAuth(AuthStatus.AUTH));
        dispatch(ActionCreator.setUserData(userAdapter(response.data)));
        dispatch(ActionCreator.setProgressStatus(false));
      })
      .catch((err) => {
        dispatch(ActionCreator.setProgressStatus(false));
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setProgressStatus(true));
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then((response) => {
      dispatch(ActionCreator.setAuthError(false));
      dispatch(ActionCreator.requireAuth(AuthStatus.AUTH));
      dispatch(ActionCreator.setUserData(userAdapter(response.data)));
      dispatch(ActionCreator.setProgressStatus(false));
    })
    .catch((err) => {
      dispatch(ActionCreator.setAuthError(true));
      dispatch(ActionCreator.setProgressStatus(false));
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

    case ActionType.SET_PROGRESS_STATUS:
      return extend(state, {
        isAuthInProgress: action.payload,
      });

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator, Operation};
