import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";

let initialState = {
  signedIn: false,
  data: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn(user) {
      return {
        signedIn: true,
        data: user
      };
    },
    signUserOut() {
      return initialState;
    }
  }
});

const { actions, reducer } = userSlice;
export const { signUserIn, signUserOut } = actions;
export default reducer;
