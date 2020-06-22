import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const PromoInfo = {
  FILM_TITLE: `The Grand Budapest Hotel`,
  FILM_GENRE: `Drama`,
  RELEASE_DATE: 2014
};

ReactDOM.render(
    <App
      filmTitle={PromoInfo.FILM_TITLE}
      filmGenre={PromoInfo.FILM_GENRE}
      releaseDate={PromoInfo.RELEASE_DATE}
      films={films}
    />,
    document.querySelector(`#root`)
);
