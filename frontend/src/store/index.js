import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user-slice';
import filmSlice from './film-slice';
import ratingSlice from './rating-slice';
import recommendationSlice from './recommendation-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    film: filmSlice.reducer,
    rating: ratingSlice.reducer,
    recommendation: recommendationSlice.reducer,
  },
});

export default store;
