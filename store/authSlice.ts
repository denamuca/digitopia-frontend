// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  userInfo: any | null;
}

const initialState: AuthState = {
  accessToken: null,
  idToken: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{
        accessToken: string;
        idToken: string;
        userInfo: any;
      }>
    ) {
      const { accessToken, idToken, userInfo } = action.payload;
      state.accessToken = accessToken;
      state.idToken = idToken;
      state.userInfo = userInfo; // Set userInfo directly
    },
    logout(state) {
      state.accessToken = null;
      state.idToken = null;
      state.userInfo = null;
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
