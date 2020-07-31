import React, {PureComponent, createRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthError} from "../../reducer/user/selectors.js";
import {Operation} from "../../reducer/user/user.js";
import Footer from "../footer/footer.jsx";
import {Page} from "../../const.js";
import history from "../../history.js";

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
    history.goBack();
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
