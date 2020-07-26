import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.js";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films.js";
import withVideoControls from "../../hocs/with-video-controls/with-video-controls.js";
import {Operation} from "../../reducer/data/data.js";
import {getFilms, getPromo} from "../../reducer/data/selectors.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {SIMILAR_FILMS_AMOUNT, AuthStatus} from "../../const.js";

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      isVideoPlayer: false,
    };

    this._renderMoviePlayer = this._renderMoviePlayer.bind(this);
    this._handleExitBtnClick = this._handleExitBtnClick.bind(this);
    this._handlePlayBtnClick = this._handlePlayBtnClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleSignInClick = this._handleSignInClick.bind(this);
  }

  _handleCardClick(movie) {
    const {getComments, onMovieChoose} = this.props;
    onMovieChoose(movie);
    getComments(movie.id);
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

  _handleSignInClick() {
    const {authStatus} = this.props;
    if (authStatus === AuthStatus.NO_AUTH) {
      return (
        <SignIn />
      );
    }

    return this.renderApp();
  }

  _renderMain() {
    return (
      <MainWrapped
        onCardClick={this._handleCardClick}
        onPlayBtnClick={this._handlePlayBtnClick}
        onSignInClick={this._handleSignInClick}
      />
    );
  }

  _renderMoviePage() {
    const {film, films} = this.props;

    const similarFilms = films
      .filter((filmItem) => filmItem.genre === film.genre && filmItem.title !== film.title)
      .slice(0, SIMILAR_FILMS_AMOUNT);

    return (
      <MoviePageWrapped
        film={film}
        similarFilms={similarFilms}
        onCardClick={this._handleCardClick}
        onPlayBtnClick={this._handlePlayBtnClick}
        onSignInClick={this._handleSignInClick}
      />
    );
  }

  _renderMoviePlayer() {
    const {chosenMovie} = this.props;

    return (
      <VideoPlayerFullWrapped
        film={chosenMovie}
        onExitBtnClick={this._handleExitBtnClick}
      />
    );
  }

  renderApp() {
    const {chosenMovie} = this.props;
    const {isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._renderMoviePlayer();
    }

    const currentPage = chosenMovie
      ?
      this._renderMoviePage()
      :
      this._renderMain();

    return currentPage;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderMoviePage()}
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
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
  chosenMovie: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool,
  ]),
  onMovieChoose: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromo(state),
  films: getFilms(state),
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getComments(filmID) {
    dispatch(Operation.loadComments(filmID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
