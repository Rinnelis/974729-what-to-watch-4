import {Film, ServerMovie} from "../types";

export const filmAdapter = (film: ServerMovie): Film => ({
  id: film.id,
  title: film.name,
  poster: film.poster_image,
  image: film.preview_image,
  bgImage: film.background_image,
  bgColor: film.background_color,
  videoUrl: film.video_link,
  previewUrl: film.preview_video_link,
  description: film.description,
  ratingScore: film.rating,
  ratingCount: film.scores_count,
  director: film.director,
  starring: film.starring,
  runTime: film.run_time,
  genre: film.genre,
  releaseDate: film.released,
  isFavorite: film.is_favorite,
});
