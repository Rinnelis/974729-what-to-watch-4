import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/movies/movies.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Genre from "../genre/genre.jsx";
import ShowMoreButton from "../show-more-btn/show-more-btn.jsx";
import {getGenresList, getFilms, getPromo, getFilmsStatus, getPromoStatus} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getFilmsByGenre} from "../../reducer/movies/selectors.js";
import {getAuthStatus, getUserData} from "../../reducer/user/selectors.js";
import {AuthStatus} from "../../const.js";

const Main = (props) => {
  const {
    film,
    films,
    genresList,
    currentGenre,
    filmsByGenre,
    onCardClick,
    onGenreClick,
    maxShownFilms,
    onShownFilmsAmountReset,
    onShownFilmsAdd,
    onPlayBtnClick,
    onSignInClick,
    authStatus,
    user,
    isLoadingFilms,
    isLoadingPromo,
  } = props;
  const {title, genre, releaseDate, bgImage, poster} = film;
  const {avatarUrl, name} = user;
  const shownFilms = filmsByGenre.slice(0, maxShownFilms);

  const isSignedIn = authStatus === AuthStatus.AUTH
    ?
    <React.Fragment>
      <div className="user-block">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt={name} width="63" height="63" />
        </div>
      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="user-block">
        <a className="user-block__link"
          onClick={onSignInClick}
        >Sign in</a>
      </div>
    </React.Fragment>;

  const getPromoMsg = () => {
    if (isLoadingPromo.isLoadingPromo && !isLoadingPromo.loadPromoError) {
      return `Promo is loading...`;
    } else if (isLoadingPromo.isLoadingPromo && isLoadingPromo.loadPromoError) {
      return `Server error occurred, please try again later`;
    }

    return false;
  };

  const getFilmsMsg = () => {
    if (isLoadingFilms.isLoadingFilms && !isLoadingFilms.loadFilmsError) {
      return `Films are loading...`;
    } else if (isLoadingFilms.isLoadingFilms && isLoadingFilms.loadFilmsError) {
      return `Server error occurred, please try again later...`;
    }

    return false;
  };

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={bgImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          {isSignedIn}
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={poster} alt={title} width="218" height="327" />
            </div>

            {getPromoMsg() ||
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
              </div>
            </div>
            }
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genre
            films={films}
            genres={genresList}
            currentGenre={currentGenre}
            onGenreClick={onGenreClick}
            onGenreChange={onShownFilmsAmountReset}
          />

          {getFilmsMsg() ||
          <MoviesList
            films={shownFilms}
            onCardClick={onCardClick}
          />
          }

          {maxShownFilms < filmsByGenre.length &&
            <ShowMoreButton
              onShowMoreClick={onShownFilmsAdd}
            />
          }
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  film: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.bool,
  ]),
  films: PropTypes.array.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  maxShownFilms: PropTypes.number.isRequired,
  onShownFilmsAmountReset: PropTypes.func.isRequired,
  onShownFilmsAdd: PropTypes.func.isRequired,
  onPlayBtnClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isLoadingFilms: PropTypes.shape({
    isLoadingFilms: PropTypes.bool.isRequired,
    loadFilmsError: PropTypes.bool.isRequired,
  }),
  isLoadingPromo: PropTypes.shape({
    isLoadingPromo: PropTypes.bool.isRequired,
    loadPromoError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  film: getPromo(state),
  films: getFilms(state),
  genresList: getGenresList(state),
  currentGenre: getCurrentGenre(state),
  filmsByGenre: getFilmsByGenre(state),
  authStatus: getAuthStatus(state),
  user: getUserData(state),
  isLoadingPromo: getPromoStatus(state),
  isLoadingFilms: getFilmsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.chooseGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
