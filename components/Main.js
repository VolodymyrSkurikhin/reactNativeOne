import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { useRoute } from "../router";
// import db from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
    console.log("useEffMain");
  }, []);

  // db.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
