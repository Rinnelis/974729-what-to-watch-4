import {NameSpace} from "../name-space.js";

export const getUserData = (state) => state[NameSpace.USER].user;

export const getAuthStatus = (state) => state[NameSpace.USER].authStatus;

export const getAuthError = (state) => state[NameSpace.USER].authError;
