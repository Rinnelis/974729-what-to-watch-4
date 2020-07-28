import React from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import {connect} from "react-redux";
import {AuthStatus, Page} from "../../const.js";
import {getCurrentPage} from "../../reducer/page/selectors.js";
import {getAuthStatus, getUserData} from "../../reducer/user/selectors.js";

const Header = (props) => {
  const {currentPage, authStatus, onSignInClick, user} = props;
  const {avatarUrl, name} = user;
  const linkToMain = currentPage !== Page.MAIN ? `/` : null;

  const isSignedIn = authStatus === AuthStatus.AUTH
    ?
    <React.Fragment>
      <div className="user-block">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt={name} width="63" height="63" />
        </div>
      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="user-block">
        <a className="user-block__link"
          onClick={onSignInClick}
        >Sign in</a>
      </div>
    </React.Fragment>;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={linkToMain} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {isSignedIn}
    </header>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  user: ProjectPropTypes.USER.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
  authStatus: getAuthStatus(state),
  user: getUserData(state),
});

export default connect(mapStateToProps)(Header);
