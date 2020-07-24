import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films.js";
import withVideoControls from "../../hocs/with-video-controls/with-video-controls.js";
import {Operation} from "../../reducer/data/data.js";
import {getFilms, getPromo, getFilmComments} from "../../reducer/data/selectors.js";
import {SIMILAR_FILMS_AMOUNT} from "../../const.js";

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      isVideoPlayer: false,
    };

    this._handleMoviePlayerRender = this._handleMoviePlayerRender.bind(this);
    this._handleExitBtnClick = this._handleExitBtnClick.bind(this);
    this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(movie) {
    const {getComments, onMovieChoose} = this.props;
    onMovieChoose(movie);
    getComments(movie.id);
  }

  _handleMoviePlayerRender() {
    const {chosenMovie} = this.props;
    return (
      <VideoPlayerFullWrapped
        film={chosenMovie}
        onExitBtnClick={this._handleExitBtnClick}
      />
    );
  }

  _handleExitBtnClick() {
    this.setState({
      isVideoPlayer: false,
    });
  }

  _handlePlayBtnClick(film) {
    const {onMovieChoose} = this.props;
    onMovieChoose(film);

    this.setState({
      isVideoPlayer: true,
    });
  }

  renderApp() {
    const {film, films, chosenMovie} = this.props;
    const {isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._handleMoviePlayerRender();
    }

    const similarFilms = films
      .filter((filmItem) => filmItem.genre === film.genre && filmItem.title !== film.title)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    if (!chosenMovie) {
      return (
        <MainWrapped
          onCardClick={this._handleCardClick}
          onPlayBtnClick={this._handlePlayBtnClick}
        />
      );
    }

    return (
      <MoviePageWrapped
        film={film}
        similarFilms={similarFilms}
        onCardClick={this._handleCardClick}
        onPlayBtnClick={this._handlePlayBtnClick}
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
              onPlayBtnClick={this._handlePlayBtnClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  film: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.bool,
  ]),
  films: PropTypes.array.isRequired,
  chosenMovie: PropTypes.string.isRequired,
  onMovieChoose: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromo(state),
  films: getFilms(state),
  comments: getFilmComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  getComments(filmID) {
    dispatch(Operation.loadComments(filmID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
