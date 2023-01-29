import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addToBookmark: (state, action) => {
      state.value.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
  },
});

export const { addToBookmark , removeBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
