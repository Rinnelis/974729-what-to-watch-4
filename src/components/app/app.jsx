import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {filmTitle, filmGenre, releaseDate} = props;

  return (
    <Main
      filmTitle={filmTitle}
      filmGenre={filmGenre}
      releaseDate={releaseDate}
    />
  );
};

export default App;
