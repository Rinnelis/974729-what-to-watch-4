import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReview from "../add-review/add-review.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import withChosenMovie from "../../hocs/with-chosen-movie/with-chosen-movie.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films.jsx";
import withVideoControls from "../../hocs/with-video-controls/with-video-controls.js";
import withReview from "../../hocs/with-review/with-review.jsx";
import {Operation} from "../../reducer/data/data.js";
import {getFilms, getPromo} from "../../reducer/data/selectors.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {getCurrentPage} from "../../reducer/page/selectors.js";
import {ActionCreator} from "../../reducer/page/page.js";
import {SIMILAR_FILMS_AMOUNT, AuthStatus, Page} from "../../const.js";

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);
const AddReviewWrapped = withReview(AddReview);

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
    this._handleAddReviewClick = this._handleAddReviewClick.bind(this);
  }

  _handleCardClick() {
    const {getComments, onMovieChoose, changePage} = this.props;
    changePage(Page.MOVIE_PAGE);
    onMovieChoose(this.props.film);
    getComments(this.props.film.id);
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
    const {changePage} = this.props;
    changePage(Page.SIGN_IN);
  }

  _handleAddReviewClick() {
    const {changePage} = this.props;
    changePage(Page.REVIEW);
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
    const {film, films, authStatus} = this.props;

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
        authStatus={authStatus}
        onAddReviewClick={this._handleAddReviewClick}
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

  _renderSignIn() {
    const {authStatus} = this.props;

    if (authStatus === AuthStatus.NO_AUTH) {
      return (
        <SignIn />
      );
    }

    return this._renderMain();
  }

  _renderAddReview() {
    const {chosenMovie, onReviewSubmit} = this.props;

    return (
      <AddReviewWrapped
        film={chosenMovie}
        onReviewSubmit={onReviewSubmit}
        onSignInClick={this._handleSignInClick}
      />
    );
  }

  renderApp() {
    const {currentPage} = this.props;
    const {isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._renderMoviePlayer();
    }

    switch (currentPage) {
      case Page.MAIN:
        return this._renderMain();
      case Page.MOVIE_PAGE:
        return this._renderMoviePage();
      case Page.SIGN_IN:
        return this._renderSignIn();
      case Page.REVIEW:
        return this._renderAddReview();
    }
    return this._renderMain();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={Page.MAIN}>
            {this.renderApp()}
          </Route>
          <Route exact path={Page.MOVIE_PAGE}>
            {this._renderMoviePage()}
          </Route>
          <Route exact path={Page.SIGN_IN}>
            {this._renderSignIn()}
          </Route>
          <Route exact path={Page.REVIEW}>
            {this._renderAddReview()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  film: PropTypes.oneOfType([
    ProjectPropTypes.FILM.isRequired,
    PropTypes.bool.isRequired,
  ]).isRequired,
  films: PropTypes.arrayOf(ProjectPropTypes.FILM.isRequired).isRequired,
  chosenMovie: ProjectPropTypes.FILM,
  onMovieChoose: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromo(state),
  films: getFilms(state),
  authStatus: getAuthStatus(state),
  currentPage: getCurrentPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  getComments(filmID) {
    dispatch(Operation.loadComments(filmID));
  },
  changePage(page) {
    dispatch(ActionCreator.setCurrentPage(page));
  },
  onReviewSubmit(review, id) {
    dispatch(Operation.sendReview(review, id));
  },
});

const AppWrapped = withChosenMovie(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapped);
