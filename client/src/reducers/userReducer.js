import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";

let initialState = {
  signedIn: false,
  pending: true,
  data: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn(state, action) {
      return {
        signedIn: true,
        pending: false,
        data: action.payload
      };
    },
    signUserOut() {
      return {
        signedIn: false,
        pending: false,
        data: null
      };
    }
  }
});

const { actions, reducer } = userSlice;
export const { signUserIn, signUserOut } = actions;
export default reducer;
