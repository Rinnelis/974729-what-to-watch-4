import React, {PureComponent} from "react";

const withChosenMovie = (Component) => {
  class WithChosenMovie extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        chosenMovie: null,
      };

      this._handleMovieChoose = this._handleMovieChoose.bind(this);
    }

    _handleMovieChoose(movie) {
      this.setState({
        chosenMovie: movie,
      });
    }

    render() {
      const {chosenMovie} = this.state;

      return <Component
        {...this.props}
        chosenMovie={chosenMovie}
        onMovieChoose={this._handleMovieChoose}
      />;
    }
  }

  return WithChosenMovie;
};

export default withChosenMovie;
