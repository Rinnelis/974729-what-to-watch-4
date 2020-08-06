import * as React from "react";
import {connect} from "react-redux";
import {Route, Redirect, RouteComponentProps} from "react-router-dom";
import {Page, AuthStatus} from "./const";
import {getAuthStatus} from "./reducer/user/selectors";

interface Props {
  auth: {
    status: string;
    error: boolean;
    isAuthInProgress: boolean;
  };
  exact: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<number>|null) => null;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
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

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
