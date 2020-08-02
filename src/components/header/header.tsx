import * as React from "react";
import {Link} from "react-router-dom";
import {Film, User} from "../../types";
import {connect} from "react-redux";
import {AuthStatus, Page} from "../../const";
import {getAuthStatus, getUserData} from "../../reducer/user/selectors";

interface Props {
  auth: {
    status: string;
    error: boolean;
  };
  user: User;
  chosenMovie: Film;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {auth, user, chosenMovie} = props;
  const {avatarUrl, name} = user;

  const isSignedIn = auth.status === AuthStatus.AUTH
    ?
    <React.Fragment>
      <div className="user-block">
        <div className="user-block__avatar">
          <Link to={Page.MY_LIST}>
            <img src={avatarUrl} alt={name} width="63" height="63" />
          </Link>
        </div>
      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="user-block">
        <Link to={Page.SIGN_IN} className="user-block__link">Sign in</Link>
      </div>
    </React.Fragment>;

  const isAddReview = chosenMovie &&
    <React.Fragment>
      <nav className="breadcrumbs">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={`${Page.FILM}/${chosenMovie.id}`} className="breadcrumbs__link">{chosenMovie.title}</Link>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link">Add review</a>
          </li>
        </ul>
      </nav>
    </React.Fragment>;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={Page.MAIN} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {isAddReview}
      {isSignedIn}
    </header>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
  user: getUserData(state),
});

export default connect(mapStateToProps)(Header);
