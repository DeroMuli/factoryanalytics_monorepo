import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import colors from "../../constants/colors";
import VectorIcon, { Icon } from "../../assets/icons/VectorIcons/VectorIcons";

type EventType = "Breakdown" | "Added Device" | "Warning" | "Removed device";

type FriendlyTimeStamp = {
  day_month_year_date: string;
  twelve_hour_time: string;
  am_or_pm: string;
};

export type TimeLineEventCardProps = {
  date: Date;
  event: EventType;
  message: string;
  room: string;
};

const TimeLineEventCard = (props: TimeLineEventCardProps): JSX.Element => {
  const friendlydate = getfrindlytimestamp(props.date);
  const icon = geticon(props.event);
  const theme = useTheme();
  return (
    <View
      style={{
        height: 150,
        width: 300,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          marginStart: 83,
          margin: 2,
          fontWeight: "bold",
          color: colors.HeadingColor,
          textDecorationLine: "underline",
        }}
      >
        {" "}
        {friendlydate.day_month_year_date}{" "}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginStart: 16, fontSize: 18 }}>
          {" "}
          {friendlydate.twelve_hour_time}{" "}
        </Text>
        <Text style={{ marginLeft: 24, fontSize: 18, fontWeight: "bold" }}>
          {props.event}
        </Text>
        <VectorIcon
          iconstyle={{ position: "absolute", right: 10, bottom: 0 }}
          icon={icon}
          iconsize={18}
          color={theme.colors.primary}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginStart: 21, fontSize: 18 }}>
          {" "}
          {friendlydate.am_or_pm}{" "}
        </Text>
        <Text
          style={{
            flexWrap: "wrap",
            marginTop: 5,
            marginStart: 25,
            width: "70%",
            fontSize: 16,
          }}
        >
          {props.message}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ marginStart: 80, marginTop: 10, fontSize: 12 }}>
          {props.room}
        </Text>
      </View>
    </View>
  );
};

const getfrindlytimestamp = (date: Date): FriendlyTimeStamp => {
  const day = date.getDay();
  const year = date.getFullYear();
  const month = getmonthname(date.getMonth());
  const day_month_year_date = `${day}/${month}/${year}`;
  const twelve_hour_time = gettwelvehourtime(
    date.getHours(),
    date.getMinutes()
  );
  const am_or_pm = getamorpm(date.getHours());
  return {
    day_month_year_date,
    twelve_hour_time,
    am_or_pm,
  };
};

const getamorpm = (hours: number): "AM" | "PM" => {
  if (hours >= 12) return "PM";
  else return "AM";
};

const gettwelvehourtime = (hours: number, minutes: number): string => {
  const hour = hours > 12 ? hours - 12 : hours;
  const minute = minutes >= 10 ? `${minutes}` : `0${minutes}`;
  return `${hour}:${minute}`;
};

const getmonthname = (monthnumber: number): string => {
  switch (monthnumber) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      throw new Error("No month corresponding to the number");
  }
};

const geticon = (event: EventType): Icon => {
  if (event == "Added Device" || event == "Removed device")
    return {
      iconlibrary: "MaterialCommunityIcons",
      iconname: "information-outline",
    };
  else if (event == "Warning")
    return { iconlibrary: "AntDesign", iconname: "warning" };
  else return { iconlibrary: "MaterialIcons", iconname: "dangerous" };
};

export default TimeLineEventCard;
