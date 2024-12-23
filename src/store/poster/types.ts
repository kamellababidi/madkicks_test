
export interface PosterState {
	posters: IPoster[];
}

export interface IPoster {
	id: number;
	title: string;
	vote_average: number;
	release_date: string;
	poster_path: string;
}
