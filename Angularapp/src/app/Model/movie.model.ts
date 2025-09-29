export interface Movie {
  movieId: number;
  title: string;
  language: string;
  genre: string;
  duration: number;
  releaseDate: string;
  rating: number;
  poster: string;
  description?: string;
  director?: string;
  cast?: string;
  fallbackPoster?: string;
  showtimes: Showtime[];
}

export interface Showtime {
  time: string;
  theater: string;
  price: number;
}

export interface LocationArea {
  name: string;
  image: string;
  theatres: string[];
}
