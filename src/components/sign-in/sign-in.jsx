import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthError} from "../../reducer/user/selectors.js";
import {Operation} from "../../reducer/user/user.js";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.email = createRef();
    this.password = createRef();

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
    const {authError} = this.props;

    const isInvalidForm = authError
      ?
      <React.Fragment>
        <div className="sign-in__message">
          <p>{authError}</p>
        </div>
      </React.Fragment>
      :
      ``;

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>);
  }
}

SignIn.propTypes = {
  authError: PropTypes.bool.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit(authData) {
    dispatch(Operation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
