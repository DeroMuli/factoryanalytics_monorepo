import React, { useEffect, useState, useRef } from "react";
import { Switch, useTheme } from "react-native-paper";
import { Dimensions, TouchableOpacity } from "react-native";
import VectorIcon from "../../assets/icons/VectorIcons/VectorIcons";
import type { Icon } from "../../assets/icons/VectorIcons/VectorIcons";
import { Text, StyleSheet } from "react-native";
import { screen_names } from "../../constants/ScreenNames";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedRedux";
import { changequipmentstate } from "../../state/equipmentstateslicer";

type FactoryEquipmentCardProp = {
  name: string;
  icon: Icon;
  mean_speed: number;
  mean_temp: number;
  socket: WebSocket;
};

const FactoryEquipmentCard = (props: FactoryEquipmentCardProp) => {
  const { colors } = useTheme();
  const isOn = useAppSelector((state) => state.equipment).filter(
    (item) => item.name == props.name
  )[0].isOn;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onToggleSwitch = () => {
    dispatch(changequipmentstate({ name: props.name, isOn: !isOn }));
    if (isOn) {
      props.socket.send(JSON.stringify({ action: "toggle", payload: "OFF" }));
    } else {
      props.socket.send(JSON.stringify({ action: "toggle", payload: "ON" }));
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.equipmentcard,
        {
          backgroundColor: isOn
            ? colors.onPrimaryContainer
            : colors.onBackground,
        },
      ]}
      onPress={() =>
        navigation.navigate(screen_names.EQUIPMENT, {
          Equipemt_name: props.name,
        })
      }
    >
      <Text style={{ margin: 5, fontWeight: "bold" }}>{props.name}</Text>
      <VectorIcon
        icon={props.icon}
        color={isOn ? colors.onPrimary : colors.onError}
        iconstyle={{ margin: 5 }}
      />
      <Text style={styles.datatext}> {props.mean_speed}° C</Text>
      <Text style={styles.datatext}> {props.mean_temp}m/s </Text>
      <Switch value={isOn} onValueChange={onToggleSwitch} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  equipmentcard: {
    margin: 5,
    width: Dimensions.get("screen").width / 2 - 15,
    borderRadius: 10,
    alignItems: "center",
  },
  datatext: {
    margin: 5,
    fontSize: 15,
  },
});

export default FactoryEquipmentCard;
