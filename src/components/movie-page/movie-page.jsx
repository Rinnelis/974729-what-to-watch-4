import React from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {MovieNav, AuthStatus} from "../../const.js";

const MoviePage = (props) => {
  const {
    film,
    similarFilms,
    onCardClick,
    currentTab,
    onTabClick,
    onCurrentTabRender,
    onPlayBtnClick,
    onSignInClick,
    authStatus,
    onAddReviewClick,
  } = props;
  const {title, genre, releaseDate, bgImage, poster} = film;

  const isSignedIn = authStatus === AuthStatus.AUTH
    ?
    <React.Fragment>
      <a href="review" className="btn btn--review movie-card__button"
        onClick={(evt) => {
          evt.preventDefault();
          onAddReviewClick(film.id);
        }}
      >Add review</a>
    </React.Fragment>
    :
    ``;

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={bgImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            onSignInClick={onSignInClick}
          />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => onPlayBtnClick(film)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <symbol id="play-s" viewBox="0 0 19 19">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
                    </symbol>
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>

                {isSignedIn}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs
                tabs={MovieNav}
                currentTab={currentTab}
                onTabClick={onTabClick}
              />

              {onCurrentTabRender()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList
            films={similarFilms}
            onCardClick={onCardClick}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  film: ProjectPropTypes.FILM.isRequired,
  similarFilms: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onCurrentTabRender: PropTypes.func.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
};

export default MoviePage;
