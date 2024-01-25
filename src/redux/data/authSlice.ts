import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api, AuthControllerAdminLoginApiResponse } from '../services/api';


const initialState: Partial<AuthControllerAdminLoginApiResponse> = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<AuthControllerAdminLoginApiResponse>>) => {
      const { token, user } = action.payload;
      state.token = token || state.token;
      state.user = user || state.user;

    },
    removeAuthData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.authControllerAdminLogin.matchFulfilled,
      (state, action) => {
        authSlice.caseReducers.setAuthData(state, action)
      }
    )
    builder.addMatcher(
      api.endpoints.authControllerAdminLogin.matchRejected,
      (state) => {
        authSlice.caseReducers.removeAuthData()
      }
    )
  },
});

export const { setAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
