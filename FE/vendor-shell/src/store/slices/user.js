import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const userTokenSlice = createSlice({
  name: 'userToken',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

const userTokenActions = userTokenSlice.actions;

export { userTokenActions };

export default userTokenSlice.reducer;
