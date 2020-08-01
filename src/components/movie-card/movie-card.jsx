import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {ProjectPropTypes} from "../../project-prop-types.js";
import VideoPlayer from "../video-player/video-player.jsx";
import {Page} from "../../const.js";

class MovieCard extends PureComponent {
  render() {
    const {film, isVideoPlaying, setVideoPlaying} = this.props;
    const {title, image} = film;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          setVideoPlaying(true);
        }}
        onMouseLeave={() => {
          setVideoPlaying(false);
        }}
      >
        <Link to={`${Page.FILM}/${film.id}`}>
          <div className="small-movie-card__image">
            <VideoPlayer
              film={film}
              isPlaying={isVideoPlaying}
            />
            <img src={image} alt={title} width="280" height="175" />
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <Link to={`${Page.FILM}/${film.id}`} className="small-movie-card__link">{title}</Link>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  film: ProjectPropTypes.FILM.isRequired,
  isVideoPlaying: PropTypes.bool.isRequired,
  setVideoPlaying: PropTypes.func.isRequired,
};

export default MovieCard;
