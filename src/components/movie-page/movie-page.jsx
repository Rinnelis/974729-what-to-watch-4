import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {MovieNav, AuthStatus, Page} from "../../const.js";
import {Operation} from "../../reducer/data/data.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {ActionCreator} from "../../reducer/movies/movies.js";
import {getSimilarFilms} from "../../reducer/movies/selectors.js";
import {getFavoriteFilmStatus} from "../../reducer/data/selectors.js";

const MoviePage = (props) => {
  const {
    chosenMovie,
    similarFilms,
    onMovieChoose,
    currentTab,
    onTabClick,
    onCurrentTabRender,
    authStatus,
    onFavoriteFilmChoose,
    onFilmsLoad,
    onFavoriteFilmSend,
  } = props;
  const {title, genre, releaseDate, bgImage, poster, id, isFavorite, bgColor} = chosenMovie;

  if (onFavoriteFilmSend.sendFavoriteFilmSuccess) {
    onFilmsLoad();
  }

  const isSignedIn = authStatus === AuthStatus.AUTH;

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
      <section className="movie-card movie-card--full" style={/* stylelint-disable-line */{backgroundColor: bgColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={bgImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="movie-card__wrap">
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
                  onClick={() => onFavoriteFilmChoose(chosenMovie)}
                >
                  {isInMyLyst}
                  <span>My list</span>
                </button>

                {isSignedIn &&
                <Link to={`${Page.FILM}/${id}/review`} className="btn btn--review movie-card__button">Add review</Link>}
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
            onCardClick={onMovieChoose}
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = {
  chosenMovie: PropTypes.oneOfType([
    ProjectPropTypes.FILM,
    PropTypes.bool,
  ]).isRequired,
  similarFilms: PropTypes.array.isRequired,
  onMovieChoose: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  onCurrentTabRender: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  onFavoriteFilmChoose: PropTypes.func.isRequired,
  onFilmsLoad: PropTypes.func.isRequired,
  onFavoriteFilmSend: PropTypes.shape({
    isSendingFavoriteFilm: PropTypes.bool.isRequired,
    sendFavoriteFilmError: PropTypes.bool.isRequired,
    sendFavoriteFilmSuccess: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state, props) => ({
  authStatus: getAuthStatus(state),
  similarFilms: getSimilarFilms(state, props.chosenMovie),
  onFavoriteFilmSend: getFavoriteFilmStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieChoose(film) {
    dispatch(ActionCreator.chooseMovie(film));
    dispatch(Operation.loadComments(film.id));
  },
  onFavoriteFilmChoose(film) {
    dispatch(Operation.sendFavoriteFilm(film.id, film.isFavorite));
  },
  onFilmsLoad() {
    dispatch(Operation.loadFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
