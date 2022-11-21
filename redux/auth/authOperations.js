import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import db from "../../firebase/config";
import { authSlice } from "./authReducer";

// const auth = getAuth(db);

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      // dispatch = useDispatch();
      const { user } = await db
        .auth()
        .signInWithEmailAndPassword(email, password);

      console.log("user", user);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      const res = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      dispatch(authSlice.actions.updateUserProfile({ userId: res.user.uid }));
      console.log("res", res);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {};

// export const authSignUpUser =
//   ({ email, password, nickname }) =>
//   async (dispatch, getState) => {
//     try {
//       // const auth = getAuth();
//       const credentials = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//     } catch (error) {
//       console.log("error.message", error.message);
//     }
//   };
