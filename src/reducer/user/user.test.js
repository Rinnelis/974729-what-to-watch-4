import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {AuthStatus} from "../../const.js";
import {user} from "../../test-data.js";
import {reducer, Operation, ActionType} from "./user.js";

const api = createAPI(() => {});

it(`Should render initital state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authStatus: AuthStatus.NO_AUTH,
    authError: false,
    user: {
      id: 0,
      email: ``,
      name: ``,
      avatarUrl: ``,
    },
  });
});

it(`Should change authStatus`, () => {
  expect(reducer({
    authStatus: AuthStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRE_AUTH,
    payload: AuthStatus.AUTH,
  })).toEqual({
    authStatus: AuthStatus.AUTH,
  });
});

it(`Should change authError`, () => {
  expect(reducer({
    authError: false,
  }, {
    type: ActionType.SET_AUTH_ERROR,
    payload: true,
  })).toEqual({
    authError: true,
  });
});

it(`Should change user data`, () => {
  expect(reducer({
    user: {
      id: 0,
      email: ``,
      name: ``,
      avatarUrl: ``,
    },
  }, {
    type: ActionType.SET_USER_DATA,
    payload: user,
  })).toEqual({
    user,
  });
});

it(`Should return checkAuth AUTH`, () => {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const userCheckAuth = Operation.checkAuth();

  apiMock
    .onGet(`/login`)
    .reply(200, [{fake: true}]);

  return userCheckAuth(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionType.REQUIRE_AUTH,
        payload: AuthStatus.AUTH,
      });
    });
});
