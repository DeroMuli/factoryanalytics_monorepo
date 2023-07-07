import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { ProgressCircle } from "react-native-svg-charts";
import { Slider } from "@miblanchard/react-native-slider";
import { Switch } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { IsMocked } from "../context/MockedorTestContext";
import { MOCK_SOCKET_URL, TEST_MACHINE_SOCKET_URL } from "@env";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { changequipmentstate } from "../state/equipmentstateslicer";
import { getEquipemntName } from "../context/EquipmentNameContext";

const SpeedControlComponent = () => {
  const { fonts, colors } = useTheme();
  const [speed, setspeed] = useState<number>(0);
  const url: string = IsMocked() ? MOCK_SOCKET_URL : TEST_MACHINE_SOCKET_URL;
  const equipmentname = getEquipemntName();
  const isOn = useAppSelector((state) => state.equipment).filter(
    (item) => item.name == equipmentname
  )[0].isOn;
  const dispatch = useAppDispatch();
  const ws = new WebSocket(url);
  useEffect(() => {
    ws.onopen = () => {
      //add logging and monitoring
      console.log("connected speed control");
    };
    ws.onerror = (event) => {
      //add logging and monitoring
      console.log("error");
      console.log(event);
    };
    return () => {
      console.log("closing speed control");
      ws.close();
    };
  }, []);
  const onToggleSwitch = () => {
    dispatch(changequipmentstate({ name: equipmentname, isOn: !isOn }));
    if (isOn) {
      setspeed(0);
      ws.send(JSON.stringify({ action: "toggle", payload: "OFF" }));
    } else {
      ws.send(JSON.stringify({ action: "toggle", payload: "ON" }));
    }
  };
  const sendnewspeed = (value: number | number[]) => {
    let num = typeof value === "number" ? value : value[0];
    //timeout added to prevent sending too many messages
    setTimeout(() => {
      try {
        ws.send(
          JSON.stringify({
            action: "set_speed",
            payload: (num * 2.55).toString(),
          })
        );
      } catch (e) {
        console.log(num);
        console.log("error sending speed");
        console.log(e.message);
      }
    }, 1000);
  };
  const speedchanged = (value: number | number[]) => {
    let num = typeof value === "number" ? value : value[0];
    setspeed(num);
  };
  return (
    <View style={styles.container}>
      <ProgressCircle
        style={styles.speed_progressCircle}
        progress={speed * 0.01}
        progressColor={colors.onPrimary}
        startAngle={-Math.PI * 0.5}
        endAngle={Math.PI * 0.5}
        strokeWidth={10}
        cornerRadius={0}
      />
      <Text
        style={{
          fontWeight: fonts.displayLarge.fontWeight,
          fontFamily: fonts.displayLarge.fontFamily,
          fontSize: fonts.displayLarge.fontSize,
          top: -130,
        }}
      >
        {Math.trunc(speed)}
      </Text>
      <Slider
        step={1}
        onValueChange={speedchanged}
        onSlidingComplete={sendnewspeed}
        thumbTintColor={colors.onPrimary}
        minimumTrackTintColor={colors.onPrimary}
        minimumValue={0}
        maximumValue={100}
        containerStyle={{ width: 150, height: 10, top: -130 }}
        value={speed}
        disabled={!isOn}
      />
      <Switch
        color={colors.onPrimary}
        style={{ top: -130, marginTop: 5 }}
        value={isOn}
        onValueChange={onToggleSwitch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  speed_progressCircle: {
    height: 150,
    width: 150,
    marginTop: 10,
  },
  container: {
    alignItems: "center",
  },
});

export default SpeedControlComponent;
