import * as React from "react";
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {Page} from "../../const";
import {Film} from "../../types";

interface Props {
  film: Film;
  isVideoPlaying: boolean;
  setVideoPlaying: (boolean) => void;
}

class MovieCard extends React.PureComponent<Props> {
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

export default MovieCard;
