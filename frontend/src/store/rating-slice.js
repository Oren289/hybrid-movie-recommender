import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRating: null,
};

const ratingSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRating(state, action) {
      state.userRating = action.payload;
    },
  },
});

export const getUserRating = (filmId, userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-rating/${filmId}&${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          throw new Error('Could not fetch rating');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    try {
      const ratingData = await fetchData();
      dispatch(ratingActions.setUserRating(ratingData.data));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const ratingActions = ratingSlice.actions;

export default ratingSlice;
