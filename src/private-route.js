import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {Page, AuthStatus} from "./const.js";
import {getAuthStatus} from "./reducer/user/selectors.js";

const PrivateRoute = (props) => {
  const {auth, exact, path, render} = props;

  const isAuth = auth.status === AuthStatus.AUTH;
  const isAuthInProgress = auth.isAuthInProgress;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (isAuth && !isAuthInProgress) {
          return render(routeProps);
        } else if (isAuthInProgress) {
          return false;
        }
        return <Redirect to={`${Page.SIGN_IN}`} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    isAuthInProgress: PropTypes.bool.isRequired,
  }).isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
