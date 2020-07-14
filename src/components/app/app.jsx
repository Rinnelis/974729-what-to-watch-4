import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films.js";
import {SIMILAR_FILMS_AMOUNT} from "../../const.js";

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);

class App extends PureComponent {
  constructor() {
    super();

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(movie) {
    const {onMovieChoose} = this.props;
    onMovieChoose(movie);
  }

  renderApp() {
    const {film, films, chosenMovie} = this.props;

    const similarFilms = films
      .filter((filmItem) => filmItem.genre === film.genre && filmItem.title !== film.title)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    if (!chosenMovie) {
      return (
        <MainWrapped
          onCardClick={this._handleCardClick}
        />
      );
    }

    return (
      <MoviePageWrapped
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
            <MoviePageWrapped
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
  chosenMovie: PropTypes.string.isRequired,
  onMovieChoose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
  films: state.films,
});

export default connect(mapStateToProps)(App);
