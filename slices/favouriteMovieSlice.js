import { createSlice } from "@reduxjs/toolkit";

export const favouriteMovieSlice = createSlice({
  name: "favouriteMovie",
  initialState: {
    movies: [],
  },
  reducers: {
    addMovie: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    removeMovie: (state, action) => {
      let newMovies = [...state.movies];
      let movieIndex = state.movies.findIndex(
        (movie) => movie.id == action.payload.id
      );
      if (movieIndex >= 0) {
        newMovies.splice(movieIndex, 1);
      } else {
        console.log("Cannot remove movie");
      }
      state.movies = newMovies;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMovie, removeMovie } = favouriteMovieSlice.actions;

export const selectMovies = (state) => state.favouriteMovie.movies;

export const selectMovieById = (state, id) =>
  state.favouriteMovie.movies.filter((movie) => movie.id == id);

export default favouriteMovieSlice.reducer;
