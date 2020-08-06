import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";
import {configure, shallow} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES, AuthStatus} from "../../const";
import {NameSpace} from "../../reducer/name-space";
import {film, films} from "../../test-data";
import history from "../../history";
import {noop} from "../../utils";

const mockStore = configureStore([]);

configure({adapter: new Adapter()});

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
    isAuthInProgress: false,
  },
});

it(`Should title or image be pressed`, () => {
  const onCardClick = jest.fn();

  const main = shallow(
      <Router history={history}>
        <Provider store={store}>
          <Main
            onGenreClick={noop}
            maxShownFilms={8}
            onShownFilmsAmountReset={noop}
            onShownFilmsAdd={noop}
            isAuth={true}
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
