import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {ALL_GENRES} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      film,
      films,
    },
    [NameSpace.MOVIES]: {
      currentGenre: ALL_GENRES,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App
          onMovieChoose={() => {}}
          chosenMovie={``}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
