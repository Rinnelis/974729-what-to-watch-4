import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const filmTitles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

const App = (props) => {
  const {filmTitle, filmGenre, releaseDate, titles} = props;

  return (
    <Main
      filmTitle={filmTitle}
      filmGenre={filmGenre}
      releaseDate={releaseDate}
      titles={titles}
    />
  );
};

App.propTypes = {
  filmTitle: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  titles: PropTypes.oneOf(filmTitles),
};

export default App;
