import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {ALL_GENRES} from "../../const.js";
import {getGenresList} from "../../utils.js";
import film from "../../mocks/film.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    film,
    films,
    genresList: getGenresList(films),
    currentGenre: ALL_GENRES,
    filmsByGenre: films,
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
