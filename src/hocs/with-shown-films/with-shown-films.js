import React, {PureComponent} from "react";
import {MAX_SHOWN_FILMS_AMOUNT} from "../../const.js";

const withShownFilms = (Component) => {
  class WithShownFilms extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        maxShownFilms: MAX_SHOWN_FILMS_AMOUNT,
      };

      this._handleShownFilmsAmountReset = this._handleShownFilmsAmountReset.bind(this);
      this._handleShownFilmsAdd = this._handleShownFilmsAdd.bind(this);
    }

    _handleShownFilmsAmountReset() {
      this.setState({
        maxShownFilms: MAX_SHOWN_FILMS_AMOUNT,
      });
    }

    _handleShownFilmsAdd() {
      const currentlyShownFilms = this.state.maxShownFilms;
      this.setState({
        maxShownFilms: currentlyShownFilms + MAX_SHOWN_FILMS_AMOUNT,
      });
    }

    render() {
      const {maxShownFilms} = this.state;

      return <Component
        {...this.props}
        maxShownFilms={maxShownFilms}
        onShownFilmsAmountReset={this._handleShownFilmsAmountReset}
        onShownFilmsAdd={this._handleShownFilmsAdd}
      />;
    }
  }

  return WithShownFilms;
};

export default withShownFilms;
