import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPoster, PosterState } from './types';

const initialState: PosterState = {
	posters: [],
};

const posterSlice = createSlice({
	name: 'poster',
	initialState,
	reducers: {
		addPoster: (state, action: PayloadAction<IPoster>) => {
			state.posters = [...state.posters, action.payload];
		},
		removePoster: (state, action: PayloadAction<number>) => {
			const posters = [...state.posters];
			state.posters = posters.filter((poster) => poster.id !== action.payload);
		},
	},
});

export const { addPoster, removePoster } = posterSlice.actions;
export default posterSlice.reducer;
