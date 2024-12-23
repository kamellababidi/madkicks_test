import { IGetTvShowsResponse, ITvShow, ITvShowDetails } from '../types/tv';

import Axios from '../helper/axios';

class TvShowService {

  public constructor() {}

  // Public Methods --------------------------------------------------------
  public async getTvShowList(): Promise<ITvShow[]> {
    try {
      const response: IGetTvShowsResponse = (await Axios.get('trending/tv/day?language=en-US')).data;
      return response.results;
    } catch {
      // todo
      return [];
    }
  }
  // --------------------

  public async getTvSDetails(movieId: number): Promise<ITvShowDetails | undefined> {
    try {
      const response: ITvShowDetails = (await Axios.get(`tv/${movieId}`)).data;
      return response;
    } catch {
      // todo
      return undefined;
    }
  }
  // -----------------------------------------------------------------------
}

export const TVShowService = new TvShowService();
