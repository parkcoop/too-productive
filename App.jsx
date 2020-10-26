/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useReducer, useState } from "react";
import AppNavigator from "./src/routes";
import * as eva from "@eva-design/eva";
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SessionContext, ThemeContext } from "./src/context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const [session, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            token: action.token,
            user: action.user,
          };
        case "SIGN_OUT":
          return {};
        default:
          throw new Error();
      }
    },
    {
      token: null,
      user: null,
    }
  );
  return (
    <ApplicationProvider {...eva} theme={eva[theme]}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <SessionContext.Provider value={{ session, dispatch }}>
          <AppNavigator />
        </SessionContext.Provider>
      </ThemeContext.Provider>
    </ApplicationProvider>
  );
};

export default App;
