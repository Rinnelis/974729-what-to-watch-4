import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ALL_GENRES} from "../../const.js";
import {getGenresList} from "../../utils.js";
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    film,
    films,
    genresList: getGenresList(films),
    currentGenre: ALL_GENRES,
    filmsByGenre: films,
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
