/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer, useState } from "react";
import AppNavigator from "./src/routes";
import * as eva from "@eva-design/eva";
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SessionContext, ThemeContext } from "./src/context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import FlashMessage from "react-native-flash-message";
import moment from "moment";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    await AsyncStorage.setItem("theme", nextTheme);
  };

  const [session, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            user: action.user,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            user: action.user,
          };
        case "SIGN_OUT":
          (async () => {
            await AsyncStorage.removeItem("token");
          })();
          return {};
        default:
          return {};
          throw new Error();
      }
    },
    {
      token: null,
      user: null,
    }
  );

  useEffect(() => {
    const checkToken = async () => {
      let user;
      let userToken;
      let tokenExpiration;
      // await AsyncStorage.removeItem('userToken')
      // await AsyncStorage.removeItem('tokenExpiration')

      try {
        userToken = await AsyncStorage.getItem("token");
        tokenExpiration = await AsyncStorage.getItem("tokenExpiration");
        let theme = await AsyncStorage.getItem("theme");
        if (theme) setTheme(theme);
        console.log(
          "Expires in: (minutes) ",
          moment.unix(tokenExpiration).diff(moment(), "minutes")
        );
        if (
          moment().diff(moment.unix(tokenExpiration), "minutes") > 0 ||
          !tokenExpiration
        ) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("tokenExpiration");
          userToken = null;
        }
      } catch (err) {
        console.log("error retrieving token", err);
      }
      if (userToken && userToken !== "undefined") {
        user = jwt_decode(userToken);
        console.log("DECODED", user);
      }
      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        user: user?.user,
      });
    };

    checkToken();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva[theme]}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <SessionContext.Provider value={{ session, dispatch }}>
          <AppNavigator />
          <FlashMessage position="top" />
        </SessionContext.Provider>
      </ThemeContext.Provider>
    </ApplicationProvider>
  );
};

export default App;
