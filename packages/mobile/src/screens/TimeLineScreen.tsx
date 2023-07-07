import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { screen_names } from "../constants/ScreenNames";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native";
import colors from "../constants/colors";
import FancySeparator from "../assets/icons/FancySeparator";
import TimeLineEventCard from "../components/Cards/TimeLineEventCard";
import type { TimeLineEventCardProps } from "../components/Cards/TimeLineEventCard";

//events card mock data
const DATA: (TimeLineEventCardProps & { id: string })[] = [
  {
    id: "1",
    date: new Date(),
    event: "Added Device",
    message: "The milling machine device number 11000 has been added",
    room: "Sewing department",
  },
  {
    id: "2",
    date: new Date(),
    event: "Warning",
    message: "The milling machine device number 11000 has issues",
    room: "Sewing department",
  },
  {
    id: "3",
    date: new Date(),
    event: "Breakdown",
    message: "The milling machine device number 11000 has broken down",
    room: "Sewing department",
  },
  {
    id: "4",
    date: new Date(),
    event: "Removed device",
    message: "The milling machine device number 11000 has been removed",
    room: "Sewing department",
  },
  {
    id: "5",
    date: new Date(),
    event: "Added Device",
    message: "The milling machine device number 11000 has been added",
    room: "Sewing department",
  },
  {
    id: "6",
    date: new Date(),
    event: "Added Device",
    message: "The milling machine device number 11000 has been added",
    room: "Sewing department",
  },
  {
    id: "7",
    date: new Date(),
    event: "Added Device",
    message: "The milling machine device number 11000 has been added",
    room: "Sewing department",
  },
];

const TimeLineScreen = ({
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  screen_names.TIMELINE,
  undefined
>) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        data={DATA}
        renderItem={({ item }) => (
          <TimeLineEventCard
            date={item.date}
            event={item.event}
            message={item.message}
            room={item.room}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={(item) => {
          const separatorcolor =
            item.leadingItem.id % 2 == 0 ? "#7DE1C3" : "#FF6E4D";
          const separatorstyle: StyleProp<ViewStyle> =
            item.leadingItem.id % 2 == 0
              ? { marginStart: 280 }
              : { marginStart: 20 };
          return (
            <FancySeparator color={separatorcolor} style={separatorstyle} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default TimeLineScreen;
