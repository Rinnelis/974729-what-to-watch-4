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
