import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {ActionCreator} from "../../reducer/movies/movies.js";
import {Operation} from "../../reducer/data/data.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Genre from "../genre/genre.jsx";
import ShowMoreButton from "../show-more-btn/show-more-btn.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {getGenresList, getFilms, getPromo, getFilmsStatus, getPromoStatus, getFavoriteFilmStatus} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getFilmsByGenre} from "../../reducer/movies/selectors.js";
import {Page} from "../../const.js";
import history from "../../history.js";

const Main = (props) => {
  const {
    film,
    films,
    genresList,
    currentGenre,
    filmsByGenre,
    onGenreClick,
    maxShownFilms,
    onShownFilmsAmountReset,
    onShownFilmsAdd,
    isLoadingFilms,
    isLoadingPromo,
    onPromoLoad,
    onFavoriteFilmChoose,
    onFavoriteFilmSend,
    isAuth,
  } = props;
  const {title, genre, releaseDate, bgImage, poster, id, isFavorite} = film;

  if (onFavoriteFilmSend.sendFavoriteFilmSuccess) {
    onPromoLoad();
  }

  const shownFilms = filmsByGenre.slice(0, maxShownFilms);

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
      return `Server error occurred, please try again later`;
    }

    return false;
  };

  const isInMyLyst = isFavorite
    ?
    <React.Fragment>
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
    </React.Fragment>
    :
    <React.Fragment>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
    </React.Fragment>;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={bgImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

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
                <Link to={`${Page.PLAYER}/${id}`} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <symbol id="play-s" viewBox="0 0 19 19">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
                    </symbol>
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button"
                  onClick={() => isAuth ? onFavoriteFilmChoose(film) : history.push(`${Page.SIGN_IN}`)}
                >
                  {isInMyLyst}
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
          />
          }

          {maxShownFilms < filmsByGenre.length &&
            <ShowMoreButton
              onShowMoreClick={onShownFilmsAdd}
            />
          }
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  film: PropTypes.oneOfType([
    ProjectPropTypes.FILM.isRequired,
    PropTypes.bool.isRequired,
  ]).isRequired,
  films: PropTypes.arrayOf(ProjectPropTypes.FILM.isRequired).isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  onGenreClick: PropTypes.func.isRequired,
  maxShownFilms: PropTypes.number.isRequired,
  onShownFilmsAmountReset: PropTypes.func.isRequired,
  onShownFilmsAdd: PropTypes.func.isRequired,
  isLoadingFilms: PropTypes.shape({
    isLoadingFilms: PropTypes.bool.isRequired,
    loadFilmsError: PropTypes.bool.isRequired,
  }),
  isLoadingPromo: PropTypes.shape({
    isLoadingPromo: PropTypes.bool.isRequired,
    loadPromoError: PropTypes.bool.isRequired,
  }),
  onFavoriteFilmChoose: PropTypes.func.isRequired,
  onPromoLoad: PropTypes.func.isRequired,
  onFavoriteFilmSend: PropTypes.shape({
    isSendingFavoriteFilm: PropTypes.bool.isRequired,
    sendFavoriteFilmError: PropTypes.bool.isRequired,
    sendFavoriteFilmSuccess: PropTypes.bool.isRequired,
  }),
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromo(state),
  films: getFilms(state),
  genresList: getGenresList(state),
  currentGenre: getCurrentGenre(state),
  filmsByGenre: getFilmsByGenre(state),
  isLoadingPromo: getPromoStatus(state),
  isLoadingFilms: getFilmsStatus(state),
  onFavoriteFilmSend: getFavoriteFilmStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.chooseGenre(genre));
  },
  onFavoriteFilmChoose(film) {
    dispatch(Operation.sendFavoriteFilm(film.id, film.isFavorite));
  },
  onPromoLoad() {
    dispatch(Operation.loadPromo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
