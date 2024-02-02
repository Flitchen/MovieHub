import { configureStore } from "@reduxjs/toolkit";
import favouriteCastSlice from "./slices/favouriteCastSlice";
import favouriteMovieSlice from "./slices/favouriteMovieSlice";

export default configureStore({
  reducer: {
    favouriteCast: favouriteCastSlice,
    favouriteMovie: favouriteMovieSlice,
  },
});
