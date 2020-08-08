export interface Film {
  id: number;
  title: string;
  poster: string;
  image: string;
  bgImage: string;
  bgColor: string;
  videoUrl: string;
  previewUrl: string;
  description: string;
  ratingScore: number;
  ratingCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  releaseDate: number;
  isFavorite: boolean;
}

export type Films = Film[];

export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export type Comments = Comment[];

export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface ServerMovie {
  [`name`]: string;
  [`genre`]: string;
  [`released`]: number;
  [`background_color`]: string;
  [`background_image`]: string;
  [`preview_image`]: string;
  [`poster_image`]: string;
  [`id`]: number;
  [`description`]: string;
  [`rating`]: number;
  [`scores_count`]: number;
  [`director`]: string;
  [`starring`]: Array<string>;
  [`run_time`]: number;
  [`preview_video_link`]: string;
  [`video_link`]: string;
  [`is_favorite`]: boolean;
}

export interface ServerUserInfo {
  [`id`]: number;
  [`email`]: string;
  [`name`]: string;
  [`avatar_url`]: string;
}
