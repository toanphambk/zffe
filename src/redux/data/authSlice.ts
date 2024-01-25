import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api, User  } from '../services/api';


export type AuthState = {
  token: string,
  user: User,
};

const initialState: Partial<AuthState> = {
  token: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<AuthState>>) => {
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
