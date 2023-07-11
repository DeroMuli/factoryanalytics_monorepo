import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";
import {
  MD3DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  MD3LightTheme as PaperLightTheme,
  MD3Theme,
} from "react-native-paper";
import { Appearance } from "react-native";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/state/store";

export default function App(): JSX.Element {
  const [theme, setTheme] =
    useColorScheme() == "dark"
      ? useState<MD3Theme>(PaperDarkTheme)
      : useState<MD3Theme>(PaperLightTheme);
  useEffect(() => {
    Appearance.addChangeListener(() => {
      const colorsheme = Appearance.getColorScheme();
      if (colorsheme == "dark") {
        setTheme(PaperDarkTheme);
      } else {
        setTheme(PaperLightTheme);
      }
    });
  });
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
