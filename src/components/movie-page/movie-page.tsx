import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Film, Films} from "../../types";
import MoviesList from "../movies-list/movies-list";
import Tabs from "../tabs/tabs";
import Header from "../header/header";
import Footer from "../footer/footer";
import {MovieNav, AuthStatus, Page} from "../../const";
import {Operation} from "../../reducer/data/data";
import {getAuthStatus} from "../../reducer/user/selectors";
import {getSimilarFilms} from "../../reducer/movies/selectors";
import {getFavoriteFilmStatus} from "../../reducer/data/selectors";
import history from "../../history";

interface Props {
  chosenMovie: Film;
  similarFilms: Films;
  currentTab: string;
  onTabClick: () => void;
  onCurrentTabRender: () => void;
  auth: {
    status: string;
    error: boolean;
  };
  onFavoriteFilmChoose: ({}) => void;
  onFilmsLoad: () => void;
  onFavoriteFilmSend: {
    isSendingFavoriteFilm: boolean;
    sendFavoriteFilmError: boolean;
    sendFavoriteFilmSuccess: boolean;
  };
}

const MoviePage: React.FunctionComponent<Props> = (props: Props) => {
  const {
    chosenMovie,
    similarFilms,
    currentTab,
    onTabClick,
    onCurrentTabRender,
    auth,
    onFavoriteFilmChoose,
    onFilmsLoad,
    onFavoriteFilmSend,
  } = props;
  const {title, genre, releaseDate, bgImage, poster, id, isFavorite, bgColor} = chosenMovie;

  if (onFavoriteFilmSend.sendFavoriteFilmSuccess) {
    onFilmsLoad();
  }

  const isSignedIn = auth.status === AuthStatus.AUTH;

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
      <section className="movie-card movie-card--full" style={{backgroundColor: bgColor}}>
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
                  onClick={() => isSignedIn ? onFavoriteFilmChoose(chosenMovie) : history.push(`${Page.SIGN_IN}`)}
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
          />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  auth: getAuthStatus(state),
  similarFilms: getSimilarFilms(state, props.chosenMovie),
  onFavoriteFilmSend: getFavoriteFilmStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteFilmChoose(film) {
    dispatch(Operation.sendFavoriteFilm(film.id, film.isFavorite));
  },
  onFilmsLoad() {
    dispatch(Operation.loadFilms());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
