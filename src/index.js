import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";
import film from "./mocks/film.js";

ReactDOM.render(
    <App
      film={film}
      films={films}
    />,
    document.querySelector(`#root`)
);
