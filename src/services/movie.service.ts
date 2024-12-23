import { IGetMoviesResponse, IMovie, IMovieDetails } from '../types/movie';

import Axios from '../helper/axios';

class MovieShowService {

  public constructor() {}

  // Public Methods --------------------------------------------------------
  public async getMoviesList(): Promise<IMovie[]> {
    try {
      const response: IGetMoviesResponse = (await Axios.get('trending/movie/day?language=en-US')).data;
      return response.results;
    } catch {
      // todo
      return [];
    }
  }
  // --------------------

  public async searchForMovie(searchText: string): Promise<IMovie[]> {
    try {
      const response: IGetMoviesResponse = (await Axios.get(`search/movie?query=${searchText}`)).data;
      return response.results;
    } catch {
      // todo
      return [];
    }
  }
  // --------------------

  public async getMovieDetails(movieId: number): Promise<IMovieDetails | undefined> {
    try {
      const response: IMovieDetails = (await Axios.get(`movie/${movieId}`)).data;
      return response;
    } catch {
      // todo
      return undefined;
    }
  }
  // -----------------------------------------------------------------------
}

export const MovieService = new MovieShowService();
