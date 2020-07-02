import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import Genre from '../genre/genre.jsx';
import {MovieGenre} from '../../const.js';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentGenre: MovieGenre.ALL,
    };

    this._handleGenreClick = this._handleGenreClick.bind(this);
  }

  _handleGenreClick(genre) {
    this.setState({
      currentGenre: genre,
    });
  }

  render() {
    const {film, films, onCardClick} = this.props;
    const {title, genre, releaseDate, bgImage, poster} = film;
    const {currentGenre} = this.state;

    let filmsByGenre = films;

    if (currentGenre !== MovieGenre.ALL) {
      filmsByGenre = films.filter((filmItem) => filmItem.genre === currentGenre);
    }

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
              genres={MovieGenre}
              currentGenre={currentGenre}
              onGenreClick={this._handleGenreClick}
            />

            <MoviesList
              films={filmsByGenre}
              onCardClick={onCardClick}
            />

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
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
  films: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Main;
