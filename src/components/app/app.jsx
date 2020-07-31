import React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import AddReview from "../add-review/add-review.jsx";
import VideoPlayerFull from "../video-player-full/video-player-full.jsx";
import MyList from "../my-list/my-list.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films.jsx";
import withVideoControls from "../../hocs/with-video-controls/with-video-controls.js";
import withReview from "../../hocs/with-review/with-review.jsx";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {getFilmsStatus} from "../../reducer/data/selectors.js";
import {AuthStatus, Page} from "../../const.js";
import history from "../../history.js";

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);
const AddReviewWrapped = withReview(AddReview);

const App = (props) => {
  const {authStatus, loadFilmsStatus} = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Page.MAIN}
          render={() => <MainWrapped />}
        />

        <Route exact path={`${Page.FILM}/:id?`}
          render={(routeProps) => {
            const movieID = +routeProps.match.params.id;
            return (loadFilmsStatus.isLoadingFilms ||
              <MoviePageWrapped
                movieID={movieID}
              />);
          }}
        />

        <Route exact path={Page.SIGN_IN}
          render={() => authStatus === AuthStatus.NO_AUTH
            ?
            <SignIn />
            :
            <Redirect to={Page.MAIN} />
          }>
        </Route>

        <Route exact path={`${Page.FILM}/:id?/review`}>
          <AddReviewWrapped />
        </Route>

        <Route exact path={`${Page.PLAYER}/:id?`}>
          <VideoPlayerFullWrapped />
        </Route>

        <Route exact path={Page.MY_LIST}
          render={() => authStatus === AuthStatus.AUTH
            ?
            <MyList />
            :
            <Redirect to={Page.SIGN_IN}/>
          }>
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authStatus: PropTypes.string.isRequired,
  loadFilmsStatus: PropTypes.shape({
    isLoadingFilms: PropTypes.bool.isRequired,
    loadFilmsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
  loadFilmsStatus: getFilmsStatus(state),
});

export default connect(mapStateToProps)(App);
