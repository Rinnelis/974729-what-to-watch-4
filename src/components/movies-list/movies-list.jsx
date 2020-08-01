import React from "react";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import MovieCard from "../movie-card/movie-card.jsx";
import withVideo from "../../hocs/with-video/with-video.jsx";

const MovieCardWrapped = withVideo(MovieCard);

const MoviesList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => {
        return <MovieCardWrapped
          key={film.id}
          film={film}
        />;
      })}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(ProjectPropTypes.FILM.isRequired).isRequired,
};

export default React.memo(MoviesList);
