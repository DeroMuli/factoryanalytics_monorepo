import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screen_names } from "../constants/ScreenNames";
import AboutScreen from "../screens/AboutScreen";
import TimeLineScreen from "../screens/TimeLineScreen";
import HomeScreen from "../screens/HomeScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "react-native-paper";

// Create Bottom Navigator.
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => {
  type tabBarIconsProps = {
    focused: boolean;
    color: string;
    size: number;
  };
  const theme = useTheme();
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={HomeScreen}
        name={screen_names.HOME}
        options={{
          tabBarIcon: (props: tabBarIconsProps) => (
            <FontAwesome
              color={
                props.focused
                  ? theme.colors.primary
                  : theme.colors.inversePrimary
              }
              name="home"
              size={20}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme.colors.elevation.level0 },
          headerTitleStyle: { color: theme.colors.onPrimary },
        }}
      />
      <Tab.Screen
        component={TimeLineScreen}
        name={screen_names.TIMELINE}
        options={{
          tabBarIcon: (props: tabBarIconsProps) => (
            <FontAwesome
              color={
                props.focused
                  ? theme.colors.primary
                  : theme.colors.inversePrimary
              }
              name="clock-o"
              size={20}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme.colors.elevation.level0 },
          headerTitleStyle: { color: theme.colors.onPrimary },
        }}
      />
      <Tab.Screen
        component={AboutScreen}
        name={screen_names.ABOUT_US}
        options={{
          tabBarIcon: (props: tabBarIconsProps) => (
            <AntDesign
              color={
                props.focused
                  ? theme.colors.primary
                  : theme.colors.inversePrimary
              }
              name="team"
              size={20}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme.colors.elevation.level0 },
          headerTitleStyle: { color: theme.colors.onPrimary },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
