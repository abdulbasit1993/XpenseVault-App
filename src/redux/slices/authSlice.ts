import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    resetAuthState(state) {
      state.loading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export const {setLoading, setError, setUser, resetAuthState} =
  authSlice.actions;

export default authSlice.reducer;
