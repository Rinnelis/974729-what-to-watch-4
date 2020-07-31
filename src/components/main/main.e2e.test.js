import React from "react";
import {Router} from "react-router-dom";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES, AuthStatus} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";
import history from "../../history.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const store = mockStore({
  [NameSpace.DATA]: {
    film,
    films,
    isLoadingFilms: false,
    isLoadingPromo: false,
    loadFilmsError: false,
    loadPromoError: false,
    isSendingFavoriteFilm: false,
    sendFavoriteFilmSuccess: false,
    sendFavoriteFilmError: false,
  },
  [NameSpace.MOVIES]: {
    currentGenre: ALL_GENRES,
  },
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
});

it(`Should title or image be pressed`, () => {
  const onCardClick = jest.fn();

  const main = shallow(
      <Router history={history}>
        <Provider store={store}>
          <Main
            onMovieChoose={() => {}}
            onGenreClick={() => {}}
            maxShownFilms={8}
            onShownFilmsAmountReset={() => {}}
            onShownFilmsAdd={() => {}}
          />
        </Provider>
      </Router>
  );

  const titles = main.find(`.small-movie-card__link`);
  const images = main.find(`.small-movie-card__image`);

  titles.forEach((title) => title.simulate(`click`));
  images.forEach((image) => image.simulate(`click`));

  expect(onCardClick).toHaveBeenCalledTimes(titles.length + images.length);
});
