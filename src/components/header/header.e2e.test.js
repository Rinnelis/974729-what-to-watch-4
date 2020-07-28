import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {AuthStatus, Page} from "../../const.js";
import Header from "./header.jsx";

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
    },
    [NameSpace.PAGE]: {
      currentPage: Page.MAIN,
    },
  });

  const onSignInClick = jest.fn();

  const header = mount(
      <Provider store={store}>
        <Header
          onSignInClick={onSignInClick}
        />
      </Provider>
  );

  const signInLink = header.find(`.user-block__link`);
  signInLink.simulate(`click`);
  expect(onSignInClick).toHaveBeenCalledTimes(1);
});
