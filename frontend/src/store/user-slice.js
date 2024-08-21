import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  preferredGenres: [],
  genreIsEmpty: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.preferredGenres = action.payload.preferredGenres;
    },
    setGenreIsEmpty(state, action) {
      state.genreIsEmpty = action.payload;
    },
    setPreferredGenres(state, action) {
      state.preferredGenres = action.payload;
    },
  },
});

export const getUserData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/get-user-profile', {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error('Could not fetch user data!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        userActions.storeUserData({
          username: userData.user.username,
          email: userData.user.email,
          preferredGenres: userData.user.preferredGenres,
        })
      );

      if (userData.user.preferredGenres.length > 0) {
        dispatch(userActions.setGenreIsEmpty(false));
      } else {
        dispatch(userActions.setGenreIsEmpty(true));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const userActions = userSlice.actions;

export default userSlice;
