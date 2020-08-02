import * as React from "react";
import {Subtract} from "utility-types";
import {MAX_SHOWN_FILMS_AMOUNT} from "../../const";

interface State {
  maxShownFilms: number;
}

interface InjectedProps {
  maxShownFilms: number;
  handleShownFilmsAmountReset: () => void;
  handleShownFilmsAdd: () => void;
}

const withShownFilms = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithShownFilms extends React.PureComponent<T, State> {
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
