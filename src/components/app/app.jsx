import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleTitleClick() {}

  render() {
    const {filmTitle, filmGenre, releaseDate, films} = this.props;

    return (
      <Main
        filmTitle={filmTitle}
        filmGenre={filmGenre}
        releaseDate={releaseDate}
        films={films}
        onTitleClick={this.handleTitleClick}
      />
    );
  }
}

App.propTypes = {
  filmTitle: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired
};

export default App;
