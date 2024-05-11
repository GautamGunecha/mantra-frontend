import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import keys from "../../assets/configs/keys";

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
    fetchCurrentUser: (state) => {
      state.loading = true;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const fetchCurrentUserAsync = () => async (dispatch) => {
  dispatch(fetchCurrentUser());
  try {
    const url = `${keys.backendUri}/auth/active/user`;
    const authToken = localStorage.getItem("authToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const response = await axios.get(url, { headers });
    const { success, data } = response.data;
    const { currentUser } = data;

    if (success) {
      dispatch(setCurrentUser(currentUser));
    }
  } catch (error) {
    console.error(error.response.data.info);
  }
};

export const {
  initiateLogIn,
  LogInSuccess,
  LogInFailure,
  initiateLogOut,
  LogoutSuccess,
  LogoutFail,
  fetchCurrentUser,
  setCurrentUser,
} = userSlice.actions;
export default userSlice.reducer;
