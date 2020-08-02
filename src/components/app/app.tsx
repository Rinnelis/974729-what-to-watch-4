import * as React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MoviePage from "../movie-page/movie-page";
import AddReview from "../add-review/add-review";
import VideoPlayerFull from "../video-player-full/video-player-full";
import MyList from "../my-list/my-list";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withShownFilms from "../../hocs/with-shown-films/with-shown-films";
import withVideoControls from "../../hocs/with-video-controls/with-video-controls";
import withReview from "../../hocs/with-review/with-review";
import {getAuthStatus} from "../../reducer/user/selectors";
import {getFilmsStatus} from "../../reducer/data/selectors";
import {AuthStatus, Page} from "../../const";
import history from "../../history";
import PrivateRoute from "../../private-route";

interface Props {
  auth: {
    status: string;
    error: boolean;
    isAuthInProgress: boolean;
  };
  loadFilmsStatus: {
    isLoadingFilms: boolean;
    loadFilmsError: boolean;
  };
}

const MainWrapped = withShownFilms(Main);
const MoviePageWrapped = withActiveTab(MoviePage);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);
const AddReviewWrapped = withReview(AddReview);

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {auth, loadFilmsStatus} = props;
  const isAuth = auth.status === AuthStatus.AUTH;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Page.MAIN} render={() => <MainWrapped isAuth={isAuth} />}
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

        <Route exact path={Page.SIGN_IN} render={() => !isAuth ? <SignIn /> : <Redirect to={Page.MAIN} />}/>

        <PrivateRoute exact path={`${Page.FILM}/:id?/review`}
          render={(routeProps) => {
            const movieID = +routeProps.match.params.id;
            return (loadFilmsStatus.isLoadingFilms ||
              <AddReviewWrapped
                movieID={movieID}
              />);
          }}
        />

        <Route exact path={`${Page.PLAYER}/:id?`}
          render={(routeProps) => {
            const movieID = +routeProps.match.params.id;
            return (loadFilmsStatus.isLoadingFilms ||
              <VideoPlayerFullWrapped
                movieID={movieID}
              />);
          }}
        />

        <PrivateRoute exact path={Page.MY_LIST} render={() => <MyList />}/>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
  loadFilmsStatus: getFilmsStatus(state),
});

export default connect(mapStateToProps)(App);
