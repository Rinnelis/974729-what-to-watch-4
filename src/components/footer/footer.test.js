import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space.js";
import {Page} from "../../const.js";
import Footer from "./footer.jsx";

const mockStore = configureStore([]);

it(`Should Footer render correctly`, () => {
  const store = mockStore({
    [NameSpace.PAGE]: {
      currentPage: Page.MAIN,
    },
  });
  const tree = renderer.create(
      <Provider store={store}>
        <Footer />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
