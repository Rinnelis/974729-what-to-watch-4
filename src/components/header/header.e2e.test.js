import React from "react";
import {Router} from "react-router-dom";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus, Page} from "../../const.js";
import Header from "./header.jsx";
import history from "../../history.js";

const location = {
  pathname: `${Page.SIGN_IN}`,
};

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should SignIn be clicked`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authStatus: AuthStatus.NO_AUTH,
      authError: false,
      user: {
        id: 0,
        email: ``,
        name: ``,
        avatarUrl: ``,
      },
      isAuthInProgress: false,
    },
  });

  const header = mount(
      <Router history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
  );

  const signInLink = header.find(`a.user-block__link`);
  signInLink.simulate(`click`, header.instance().setState({
    location,
  }));
  expect(header.instance().state.location).toEqual(location);
});
