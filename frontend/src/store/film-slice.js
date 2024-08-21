import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  paginatedFilms: [],
  dataCount: 0,
  pageCount: 0,
  itemOffset: 0,
  selectedPage: 1,
  isLoading: 0,
  genres: [],
  searchParams: '',
  actionFilms: [],
  horrorFilms: [],
  animationFilms: [],
  romanceFilms: [],
};

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    storeFilmsData(state, action) {
      // state.films = action.payload.films;
      state.actionFilms = action.payload.actionFilms;
      state.horrorFilms = action.payload.horrorFilms;
      state.animationFilms = action.payload.animationFilms;
      state.romanceFilms = action.payload.romanceFilms;
    },
    storePaginatedFilmsData(state, action) {
      state.paginatedFilms = action.payload.films;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setItemOffset(state, action) {
      state.itemOffset = action.payload;
    },
    setSelectedPage(state, action) {
      state.selectedPage = action.payload;
    },
    setSelectedGenres(state, action) {
      state.genres = action.payload;
    },
    setDataCount(state, action) {
      state.dataCount = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setSearchParams(state, action) {
      state.searchParams = action.payload;
    },
  },
});

export const getFilmsByGenres = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const actionFilmResponse = await fetch(`http://localhost:5000/get-recom/28`);
      const horrorFilmResponse = await fetch(`http://localhost:5000/get-recom/27`);
      const animationFilmResponse = await fetch(`http://localhost:5000/get-recom/16`);
      const romanceFilmResponse = await fetch(`http://localhost:5000/get-recom/10749`);

      const data = {
        actionFilms: await actionFilmResponse.json(),
        horrorFilms: await horrorFilmResponse.json(),
        animationFilms: await animationFilmResponse.json(),
        romanceFilms: await romanceFilmResponse.json(),
      };

      return data;
    };

    dispatch(filmActions.setIsLoading(true));

    try {
      const films = await fetchData();
      dispatch(
        filmActions.storeFilmsData({
          actionFilms: films.actionFilms.data,
          horrorFilms: films.horrorFilms.data,
          animationFilms: films.animationFilms.data,
          romanceFilms: films.romanceFilms.data,
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch(filmActions.setIsLoading(false));
  };
};

export const getPaginatedFilms = (page, searchParams) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/get-paginated-films/${page}&${searchParams}`);

      if (!response.ok) {
        throw new Error('Could not fetch films');
      }

      const data = await response.json();
      return data;
    };

    dispatch(filmActions.setIsLoading(true));

    try {
      const films = await fetchData();
      dispatch(
        filmActions.storePaginatedFilmsData({
          films: films.data,
        })
      );

      dispatch(filmActions.setPageCount(films.pagination.pageCount));

      // dispatch(filmActions.setItemOffset(0));
      dispatch(filmActions.setSelectedPage(page));
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch(filmActions.setIsLoading(false));
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const fetchGenres = async () => {
      const response = await fetch('http://localhost:5000/get-genres');
      if (!response.ok) {
        throw new Error('Could not fetch films');
      } else {
        const data = await response.json();
        return data;
      }
    };

    try {
      const genres = await fetchGenres();
      dispatch(filmActions.setSelectedGenres(genres.data));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getEstimatedFilmCount = () => {
  return async (dispatch) => {
    try {
      const count = await fetch('http://localhost:5000/get-film-count');
      dispatch(filmActions.setDataCount(count.data));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const handlePaginationClick = (selectedPage, newOffset) => {
  return async (dispatch) => {
    dispatch(filmActions.setSelectedPage(selectedPage));
    dispatch(filmActions.setItemOffset(newOffset));
  };
};

export const filmActions = filmSlice.actions;

export default filmSlice;
