import { screen_names } from "../constants/ScreenNames";

export type RootStackParamList = {
  [screen_names.HOME]: undefined;
  [screen_names.ABOUT_US]: undefined;
  [screen_names.EQUIPMENT]: { Equipemt_name: string };
  [screen_names.TIMELINE]: undefined;
  [screen_names.TABS]: undefined;
};
