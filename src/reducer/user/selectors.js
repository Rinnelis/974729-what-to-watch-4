import {NameSpace} from "../name-space.js";

export const getUserData = (state) => state[NameSpace.USER].user;

export const getAuthStatus = (state) => ({
  status: state[NameSpace.USER].authStatus,
  error: state[NameSpace.USER].authError,
  isAuthInProgress: state[NameSpace.USER].isAuthInProgress,
});

export const getAuthError = (state) => state[NameSpace.USER].authError;
