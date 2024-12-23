
export interface ITvShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface ITvShowDetails extends ITvShow {
  overview: string;
  genres: ITvShowGenre[];
}

export interface IGetTvShowsRequest {}

export interface IGetTvShowsResponse {
  page: number;
  results: ITvShow[];
}

export interface ITvShowGenre {
  id: number;
  name: string;
}
