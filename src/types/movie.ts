
export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export interface IMovieDetails extends IMovie {
  overview: string;
  genres: IMovieGenre[];
}

export interface IGetMoviesResponse {
  page: number;
  results: IMovie[];
}

export interface IMovieGenre {
  id: number;
  name: string;
}
