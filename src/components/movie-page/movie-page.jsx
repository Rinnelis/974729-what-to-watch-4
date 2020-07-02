import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import Overview from "../overview/overview.jsx";
import Details from "../details/details.jsx";
import Reviews from "../reviews/reviews.jsx";
import Tabs from '../tabs/tabs.jsx';
import {MovieNav} from '../../const.js';

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: MovieNav.OVERVIEW,
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(tab) {
    this.setState({
      currentTab: tab
    });
  }

  _renderCurrentTab(currentTab) {
    const {film} = this.props;

    switch (currentTab) {
      case MovieNav.OVERVIEW:
        return (
          <Overview
            film={film}
          />
        );
      case MovieNav.DETAILS:
        return (
          <Details
            film={film}
          />
        );
      case MovieNav.REVIEWS:
        return (
          <Reviews
            film={film}
          />
        );
      default: return null;
    }
  }

  render() {
    const {film, similarFilms, onCardClick} = this.props;
    const {title, genre, releaseDate, bgImage, poster} = film;
    const {currentTab} = this.state;

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
                <Tabs
                  tabs={MovieNav}
                  currentTab={currentTab}
                  onTabClick={this._handleTabClick}
                />

                {this._renderCurrentTab(currentTab)}
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
  }).isRequired,
  similarFilms: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default MoviePage;
