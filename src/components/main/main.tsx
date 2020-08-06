import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Film, Films} from "../../types";
import {ActionCreator} from "../../reducer/movies/movies";
import {Operation} from "../../reducer/data/data";
import MoviesList from "../movies-list/movies-list";
import Genre from "../genre/genre";
import ShowMoreButton from "../show-more-btn/show-more-btn";
import Header from "../header/header";
import Footer from "../footer/footer";
import {getGenresList, getFilms, getPromo, getFilmsStatus, getPromoStatus, getFavoriteFilmStatus} from "../../reducer/data/selectors";
import {getCurrentGenre, getFilmsByGenre} from "../../reducer/movies/selectors";
import {Page} from "../../const";
import history from "../../history";

interface Props {
  film: Film;
  films: Films;
  genresList: string[];
  currentGenre: string;
  filmsByGenre: Films;
  onGenreClick: () => void;
  maxShownFilms: number;
  onShownFilmsAmountReset: () => void;
  onShownFilmsAdd: () => void;
  isLoadingFilms: {
    isLoadingFilms: boolean;
    loadFilmsError: boolean;
  };
  isLoadingPromo: {
    isLoadingPromo: boolean;
    loadPromoError: boolean;
  };
  onFavoriteFilmChoose: (object) => void;
  onPromoLoad: () => void;
  onFavoriteFilmSend: {
    isSendingFavoriteFilm: boolean;
    sendFavoriteFilmError: boolean;
    sendFavoriteFilmSuccess: boolean;
  };
  isAuth: boolean;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
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
