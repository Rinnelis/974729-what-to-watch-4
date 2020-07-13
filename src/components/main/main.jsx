import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Genre from "../genre/genre.jsx";
import ShowMoreButton from '../show-more-btn/show-more-btn.jsx';
import {MAX_SHOWN_FILMS_AMOUNT} from "../../const.js";

class Main extends PureComponent {
  constructor() {
    super();

    this.state = {
      maxShownFilms: MAX_SHOWN_FILMS_AMOUNT,
    };
  }

  render() {
    const {film, genresList, currentGenre, filmsByGenre, onCardClick, onGenreClick} = this.props;
    const {title, genre, releaseDate, bgImage, poster} = film;
    const {maxShownFilms} = this.state;
    const shownFilms = filmsByGenre.slice(0, maxShownFilms);

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

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={poster} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
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
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <Genre
              genres={genresList}
              currentGenre={currentGenre}
              onGenreClick={onGenreClick}
              onGenreChange={() => this.setState({
                maxShownFilms: MAX_SHOWN_FILMS_AMOUNT,
              })}
            />

            <MoviesList
              films={shownFilms}
              onCardClick={onCardClick}
            />

            {maxShownFilms < filmsByGenre.length &&
            <ShowMoreButton
              onShowMoreClick={() => {
                const currentlyShownFilms = this.state.maxShownFilms;

                this.setState({
                  maxShownFilms: currentlyShownFilms + MAX_SHOWN_FILMS_AMOUNT,
                });
              }}
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
  }
}

Main.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    bgImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
  genresList: state.genresList,
  currentGenre: state.currentGenre,
  filmsByGenre: state.filmsByGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.chooseGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre(genre));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
