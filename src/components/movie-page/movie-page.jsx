import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {v4 as uuidv4} from "uuid";
import {RatingLevel} from '../../const.js';

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {film} = this.props;
    const {title, genre, releaseDate, bgImage, poster, ratingScore, ratingCount, description, director, starring} = film;

    const getRatingLevel = (count) => {
      let ratingLevel = ``;
      if (count < 3) {
        ratingLevel = RatingLevel.BAD;
      } else if (count >= 3 && count < 5) {
        ratingLevel = RatingLevel.NORMAL;
      } else if (count >= 5 && count < 8) {
        ratingLevel = RatingLevel.GOOD;
      } else if (count >= 8 && count < 10) {
        ratingLevel = RatingLevel.VERY_GOOD;
      } else {
        ratingLevel = RatingLevel.AWESOME;
      }
      return ratingLevel;
    };

    const getStarring = (actors) => {
      return actors.join(`, `);
    };

    const getDescription = (text) => {
      return (
        <React.Fragment>
          {text.map((item) => {
            return <p key={`item-${uuidv4()}`}>{item}</p>;
          })}
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={bgImage} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    <li className="movie-nav__item movie-nav__item--active">
                      <a href="#" className="movie-nav__link">Overview</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Details</a>
                    </li>
                    <li className="movie-nav__item">
                      <a href="#" className="movie-nav__link">Reviews</a>
                    </li>
                  </ul>
                </nav>

                <div className="movie-rating">
                  <div className="movie-rating__score">{ratingScore}</div>
                  <p className="movie-rating__meta">
                    <span className="movie-rating__level">{getRatingLevel(ratingScore)}</span>
                    <span className="movie-rating__count">{ratingCount} ratings</span>
                  </p>
                </div>

                <div className="movie-card__text">
                  {getDescription(description)}

                  <p className="movie-card__director"><strong>Director: {director}</strong></p>

                  <p className="movie-card__starring"><strong>Starring: {getStarring(starring)} and other</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
                </h3>
              </article>

              <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                  <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
                </div>
                <h3 className="small-movie-card__title">
                  <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
                </h3>
              </article>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
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

MoviePage.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    bgImage: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.array.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  }).isRequired
};

export default MoviePage;
