import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen_names } from "../constants/ScreenNames";
import BottomTabNavigator from "./BottomTabsNavigator";
import EquipmentScreen from "../screens/EquipmentScreen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function MainNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={screen_names.TABS}>
      <Stack.Screen
        component={BottomTabNavigator}
        name={screen_names.TABS}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EquipmentScreen}
        name={screen_names.EQUIPMENT}
        options={({ route }) => ({
          title: route.params.Equipemt_name,
        })}
      />
    </Stack.Navigator>
  );
}
