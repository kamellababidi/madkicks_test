import { combineReducers } from '@reduxjs/toolkit';
import posterSlice from './poster/slice';

const rootReducer = combineReducers({
	poster: posterSlice,
});

export default rootReducer;
