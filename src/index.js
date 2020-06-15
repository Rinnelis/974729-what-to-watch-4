import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoInfo = {
  FILM_TITLE: `The Grand Budapest Hotel`,
  FILM_GENRE: `Drama`,
  RELEASE_DATE: 2014
};

const titles = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

ReactDOM.render(
    <App
      filmTitle={PromoInfo.FILM_TITLE}
      filmGenre={PromoInfo.FILM_GENRE}
      releaseDate={PromoInfo.RELEASE_DATE}
      titles={titles}
    />,
    document.querySelector(`#root`)
);
