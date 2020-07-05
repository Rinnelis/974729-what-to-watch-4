import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {SIMILAR_FILMS_AMOUNT} from '../../const.js';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      activeMovie: null
    };

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(movie) {
    this.setState({
      activeMovie: movie
    });
  }

  renderApp() {
    const {film, films} = this.props;

    const similarFilms = films
      .filter((filmItem) => filmItem.genre === film.genre && filmItem.title !== film.title)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    if (!this.state.activeMovie) {
      return (
        <Main
          onCardClick={this._handleCardClick}
        />
      );
    }

    return (
      <MoviePage
        film={film}
        similarFilms={similarFilms}
        onCardClick={this._handleCardClick}
      />
    );
  }

  render() {
    const {film, films} = this.props;

    const similarFilms = films
      .filter((filmItem) => filmItem.genre === film.genre && filmItem.title !== film.title)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              film={film}
              similarFilms={similarFilms}
              onCardClick={this._handleCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  film: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
  films: state.films,
});

export default connect(mapStateToProps)(App);
