import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
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
        <Main
          onCardClick={() => {}}
          onGenreClick={() => {}}
          maxShownFilms={8}
          onShownFilmsAmountReset={() => {}}
          onShownFilmsAdd={() => {}}
          onPlayBtnClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
