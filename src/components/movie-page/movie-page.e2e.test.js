import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MoviePage from "./movie-page.jsx";
import {NameSpace} from "../../reducer/name-space.js";
import {film, films} from "../../test-data.js";
import {AuthStatus, MovieNav, Page} from "../../const.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`MoviePage tests`, () => {
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
      currentPage: Page.MOVIE_PAGE,
    },
  });

  it(`Should onPlayBtnClick appeal to promo`, () => {
    const onPlayBtnClick = jest.fn();

    const moviePage = mount(
        <Provider store={store}>
          <MoviePage
            similarFilms={films}
            onCardClick={() => {}}
            currentTab={MovieNav.OVERVIEW}
            onTabClick={() => {}}
            onCurrentTabRender={() => {}}
            onPlayBtnClick={onPlayBtnClick}
            film={film}
            onSignInClick={() => {}}
            onAddReviewClick={() => {}}
            authStatus={AuthStatus.NO_AUTH}
          />
        </Provider>
    );

    const playBtn = moviePage.find(`.btn--play`);
    playBtn.simulate(`click`, film);
    expect(onPlayBtnClick).toHaveBeenCalledWith(film);
  });

  it(`Should AddReview btn be clicked`, () => {
    const onAddReviewClick = jest.fn();

    const moviePage = mount(
        <Provider store={store}>
          <MoviePage
            similarFilms={films}
            onCardClick={() => {}}
            currentTab={MovieNav.OVERVIEW}
            onTabClick={() => {}}
            onCurrentTabRender={() => {}}
            onPlayBtnClick={() => {}}
            film={film}
            onSignInClick={() => {}}
            onAddReviewClick={onAddReviewClick}
            authStatus={AuthStatus.AUTH}
          />
        </Provider>
    );

    const reviewBtn = moviePage.find(`.btn--review`);
    reviewBtn.simulate(`click`, film.id);
    expect(onAddReviewClick).toHaveBeenCalledWith(film.id);
  });
});
