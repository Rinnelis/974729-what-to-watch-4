import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main";
import {ALL_GENRES, AuthStatus} from "../../const.js";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main tests`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      film,
      films,
      isLoadingFilms: false,
      isLoadingPromo: false,
      loadFilmsError: false,
      loadPromoError: false,
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
    }
  });

  it(`Should title or image be pressed`, () => {
    const onCardClick = jest.fn();

    const main = shallow(
        <Provider store={store}>
          <Main
            onCardClick={() => {}}
            onGenreClick={() => {}}
            maxShownFilms={8}
            onShownFilmsAmountReset={() => {}}
            onShownFilmsAdd={() => {}}
            onPlayBtnClick={() => {}}
            onSignInClick={() => {}}
          />
        </Provider>
    );

    const titles = main.find(`.small-movie-card__link`);
    const images = main.find(`.small-movie-card__image`);

    titles.forEach((title) => title.simulate(`click`));
    images.forEach((image) => image.simulate(`click`));

    expect(onCardClick).toHaveBeenCalledTimes(titles.length + images.length);
  });

  it(`Should play btn be clicked`, () => {
    const handlePlayClick = jest.fn();
    const movie = film;

    const main = mount(
        <Provider store={store}>
          <Main
            onCardClick={() => {}}
            onGenreClick={() => {}}
            maxShownFilms={8}
            onShownFilmsAmountReset={() => {}}
            onShownFilmsAdd={() => {}}
            onPlayBtnClick={handlePlayClick}
            onSignInClick={() => {}}
          />
        </Provider>
    );

    const playButton = main.find(`.btn--play`);
    playButton.simulate(`click`, movie);
    expect(handlePlayClick).toHaveBeenCalledWith(movie);
  });

  it(`Should signIn be clicked`, () => {
    const onSignInClick = jest.fn();

    const header = mount(
        <Provider store={store}>
          <Main
            onCardClick={() => {}}
            onGenreClick={() => {}}
            maxShownFilms={8}
            onShownFilmsAmountReset={() => {}}
            onShownFilmsAdd={() => {}}
            onPlayBtnClick={() => {}}
            onSignInClick={onSignInClick}
          />
        </Provider>
    );

    const signInLink = header.find(`.user-block__link`);
    signInLink.simulate(`click`);
    expect(onSignInClick).toHaveBeenCalledTimes(1);
  });
});
