import React from "react";
import { View, Text } from "react-native";
import definedcolors from "../../constants/colors";
import VectorIcon from "../../assets/icons/VectorIcons";
import type { Icon } from "../../assets/icons/VectorIcons";
import { useTheme } from "react-native-paper";

type GeneralStatsCardProps = {
  dataTypeString: string;
  dataValue: number;
  dataicon: Icon;
  units: string;
};

const GeneralStatsCard = (props: GeneralStatsCardProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: "40%",
        width: "40%",
        backgroundColor: colors.onPrimaryContainer,
        borderRadius: 10,
        padding: 5,
      }}
    >
      <Text
        style={{
          color: definedcolors.HeadingColor,
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        {props.dataTypeString}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 5,
        }}
      >
        <VectorIcon
          color={colors.onPrimary}
          icon={props.dataicon}
          iconsize={60}
          iconstyle={{ margin: 5 }}
        />
        <Text style={{ fontSize: 25 }}>{props.dataValue}</Text>
        <Text style={{ bottom: -3 }}> {props.units}</Text>
      </View>
    </View>
  );
};

export default GeneralStatsCard;
