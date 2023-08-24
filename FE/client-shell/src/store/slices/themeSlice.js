import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLightTheme: true,
};

const themeSlice = createSlice({
  name: 'themeConfig',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isLightTheme = !state.isLightTheme;
    },
  },
});

const themeActions = themeSlice.actions;

export { themeActions };

export default themeSlice.reducer;
