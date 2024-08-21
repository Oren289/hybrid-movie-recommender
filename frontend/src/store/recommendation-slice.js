import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cbf_films: [],
  cf_films: [],
  hybrid_films: [],
  cf_params_count: 0,
  is_loading: false,
};

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    storeCbfFilmsData(state, action) {
      state.cbf_films = action.payload.films;
    },
    storeCfFilmsData(state, action) {
      state.cf_films = action.payload.films;
    },
    storeHybridFilmsData(state, action) {
      state.hybrid_films = action.payload.films;
    },
    setCfParamsCount(state, action) {
      state.cf_params_count = action.payload;
    },
    setIsLoading(state, action) {
      state.is_loading = action.payload;
    },
  },
});

export const getCbfRecommendation = (data) => {
  return async (dispatch) => {
    let queryParams = '';
    let paramsCount = 0;
    console.log(data);
    data.forEach((film) => {
      queryParams += `movies[]=${film.films[0].title}&`;
      paramsCount++;
    });

    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/movie/cbf?` + queryParams);

      if (!response.ok) {
        throw new Error('Could not fetch films');
      }

      const data = await response.json();
      return data;
    };

    dispatch(recommendationActions.setIsLoading(true));

    try {
      const films = await fetchData();
      dispatch(
        recommendationActions.storeCbfFilmsData({
          films: films.result.slice(paramsCount),
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch(recommendationActions.setIsLoading(false));
  };
};

export const getCfRecommendation = (data) => {
  return async (dispatch) => {
    let queryParams = '';
    let paramsCount = 0;
    console.log(data);
    data.forEach((film) => {
      queryParams += `movies[]=("${film.films[0].title}", ${parseFloat(film.rating)})&`;
      paramsCount++;
    });

    console.log(queryParams);

    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/movie/cf?` + queryParams);

      if (!response.ok) {
        throw new Error('Could not fetch films');
      }

      const data = await response.json();
      return data;
    };

    dispatch(recommendationActions.setIsLoading(true));

    try {
      const films = await fetchData();
      dispatch(
        recommendationActions.storeCfFilmsData({
          films: films.result.slice(paramsCount),
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch(recommendationActions.setIsLoading(false));
  };
};

export const getHybridRecommendation = (data) => {
  return async (dispatch) => {
    let queryParams = '';
    let paramsCount = 0;
    console.log(data);
    data.forEach((film) => {
      queryParams += `movies[]=("${film.films[0].title}", ${parseFloat(film.rating)})&`;
      paramsCount++;
    });

    console.log(queryParams);

    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/movie/hybrid?` + queryParams);

      if (!response.ok) {
        throw new Error('Could not fetch films');
      }

      const data = await response.json();
      return data;
    };

    dispatch(recommendationActions.setIsLoading(true));

    try {
      const films = await fetchData();
      dispatch(
        recommendationActions.storeHybridFilmsData({
          films: films.result.slice(paramsCount),
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch(recommendationActions.setIsLoading(false));
  };
};

export const recommendationActions = recommendationSlice.actions;

export default recommendationSlice;
