import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {connect} from "react-redux";
import {AuthStatus, Page} from "../../const.js";
import {getAuthStatus, getUserData} from "../../reducer/user/selectors.js";

const Header = (props) => {
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

Header.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  user: ProjectPropTypes.USER.isRequired,
  chosenMovie: ProjectPropTypes.FILM,
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
  user: getUserData(state),
});

export default connect(mapStateToProps)(Header);
