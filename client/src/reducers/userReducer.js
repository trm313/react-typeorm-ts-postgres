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
    signUserIn(state, action) {
      return {
        signedIn: true,
        data: action.payload
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
