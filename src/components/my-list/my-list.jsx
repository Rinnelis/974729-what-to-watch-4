import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import MoviesList from "../movies-list/movies-list.jsx";
import Footer from "../footer/footer.jsx";
import {Page} from "../../const.js";
import {getFavoriteFilms, getFavoriteFilmsStatus} from "../../reducer/data/selectors.js";
import {Operation} from "../../reducer/data/data.js";
import {getUserData} from "../../reducer/user/selectors.js";
import {ActionCreator} from "../../reducer/movies/movies.js";

const MyList = (props) => {
  const {user, favoriteFilms, onMovieChoose, isLoadingFavoriteFilms} = props;
  const {name, avatarUrl} = user;

  const getFavoriteFilmsMsg = () => {
    if (isLoadingFavoriteFilms.isLoadingFavoriteFilms && !isLoadingFavoriteFilms.loadFavoriteFilmsError) {
      return `Favorite films are loading...`;
    } else if (isLoadingFavoriteFilms.isLoadingFavoriteFilms && isLoadingFavoriteFilms.loadFavoriteFilmsError) {
      return `Server error occurred, please try again later`;
    }

    return false;
  };

  return (
    <React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Page.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">
            <div className="user-block__avatar">
              <Link to={Page.MAIN}>
                <img src={avatarUrl} alt={name} width="63" height="63" />
              </Link>
            </div>
          </div>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {getFavoriteFilmsMsg() ||
          <MoviesList
            films={favoriteFilms}
            onCardClick={onMovieChoose}
          />
          }
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MyList.propTypes = {
  user: ProjectPropTypes.USER,
  favoriteFilms: PropTypes.arrayOf(ProjectPropTypes.FILM).isRequired,
  onMovieChoose: PropTypes.func.isRequired,
  isLoadingFavoriteFilms: PropTypes.shape({
    isLoadingFavoriteFilms: PropTypes.bool.isRequired,
    loadFavoriteFilmsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  user: getUserData(state),
  favoriteFilms: getFavoriteFilms(state),
  isLoadingFavoriteFilms: getFavoriteFilmsStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieChoose(film) {
    dispatch(ActionCreator.chooseMovie(film));
    dispatch(Operation.loadComments(film.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
