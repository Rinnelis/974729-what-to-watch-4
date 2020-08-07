import * as React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors";
import {Operation} from "../../reducer/user/user";
import Footer from "../footer/footer";
import {Page} from "../../const";

interface Props {
  auth: {
    status: string;
    error: boolean;
  };
  onAuthSubmit: (object) => void;
  checkAuth: () => void;
}

class SignIn extends React.PureComponent<Props> {
  private email: React.RefObject<HTMLInputElement>;
  private password: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.email = React.createRef();
    this.password = React.createRef();

    this._handleAuthSubmit = this._handleAuthSubmit.bind(this);
  }

  _handleAuthSubmit(evt) {
    const {onAuthSubmit} = this.props;
    evt.preventDefault();
    onAuthSubmit({
      email: this.email.current.value,
      password: this.password.current.value,
    });
  }

  render() {
    const {auth} = this.props;

    const isInvalidForm = auth.error
      ?
      <React.Fragment>
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>
      </React.Fragment>
      :
      ``;

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Page.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form"
            onSubmit={this._handleAuthSubmit}
          >
            {isInvalidForm}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  required
                  ref={this.email}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  required
                  ref={this.password}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </React.Fragment>);
  }
}

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit(authData) {
    dispatch(Operation.login(authData));
  },
  checkAuth() {
    dispatch(Operation.checkAuth());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
