import { createSlice } from "@reduxjs/toolkit";

export const favouriteCastSlice = createSlice({
  name: "favouriteCast",
  initialState: {
    casts: [],
  },
  reducers: {
    addCast: (state, action) => {
      state.casts = [...state.casts, action.payload];
    },
    addCasts: (state, action) => {
      state.casts = action.payload;
    },
    removeCast: (state, action) => {
      let newCasts = [...state.casts];
      let castIndex = state.casts.findIndex(
        (cast) => cast.id == action.payload.id
      );
      if (castIndex >= 0) {
        newCasts.splice(castIndex, 1);
      } else {
        console.log("Cannot remove cast");
      }
      state.casts = newCasts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCast, addCasts, removeCast } = favouriteCastSlice.actions;

export const selectCasts = (state) => state.favouriteCast.casts;

export const selectCastById = (state, id) =>
  state.favouriteCast.casts.filter((cast) => cast.id == id);

export default favouriteCastSlice.reducer;
