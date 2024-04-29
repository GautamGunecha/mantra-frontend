import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  applicationError: null,
  loading: false,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initiateLogIn: (state) => {
      state.loading = true;
    },
    LogInSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.applicationError = null;
      state.loggedIn = true;
    },
    LogInFailure: (state, action) => {
      state.applicationError = action.payload;
      state.loading = false;
      state.loggedIn = false;
    },
    initiateLogOut: (state) => {
      state.loading = true;
    },
    LogoutSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.applicationError = null;
      state.loggedIn = false;
    },
    LogoutFail: (state, action) => {
      state.applicationError = action.payload;
      state.loading = false;
      state.loggedIn = false;
    },
  },
});

export const {
  initiateLogIn,
  LogInSuccess,
  LogInFailure,
  initiateLogOut,
  LogoutSuccess,
  LogoutFail,
} = userSlice.actions;
export default userSlice.reducer;
