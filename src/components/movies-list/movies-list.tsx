import * as React from "react";
import {Films} from "../../types";
import MovieCard from "../movie-card/movie-card";
import withVideo from "../../hocs/with-video/with-video";

interface Props {
  films: Films;
}

const MovieCardWrapped = withVideo(MovieCard);

const MoviesList: React.FunctionComponent<Props> = (props: Props) => {
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

export default React.memo(MoviesList);
