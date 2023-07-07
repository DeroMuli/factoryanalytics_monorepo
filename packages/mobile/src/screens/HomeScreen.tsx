import React, { useEffect, useState } from "react";
import { setEquipements } from "../state/equipmentstateslicer";
import { FlatList, View } from "react-native";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import FactoryEquipmentCard from "../components/Cards/FactoryEquipmentCard";
import colors from "../constants/colors";
import { ActivityIndicator } from "react-native-paper";
import { useGetFactoryEquipmentsDataQuery } from "../state/apislicer";
import { useAppSelector, useAppDispatch } from "../hooks/useTypedRedux";
import { equipmentState } from "../state/equipmentstateslicer";
import { MOCK_SOCKET_URL, TEST_MACHINE_SOCKET_URL } from "@env";

type equipment_card_item_data = {
  id: number;
  machineName: string;
  icon: { iconlibrary: string; iconname: string };
  mean_speed: number;
  mean_temp: number;
};

export type fetcheddata_schema = {
  id: number;
  name: string;
  mean_speed: number;
  mean_torque: number;
  mean_temp: number;
  icon_library: string;
  icon_name: string;
  createdAt: string;
  updatedAt: string;
};

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const Mock_Socket = new WebSocket(MOCK_SOCKET_URL);
  const Test_Socket = new WebSocket(TEST_MACHINE_SOCKET_URL);
  const renderItem = ({ item }) => {
    return (
      <FactoryEquipmentCard
        name={item.machineName}
        icon={item.icon}
        mean_speed={item.mean_speed}
        mean_temp={item.mean_temp}
        socket={item.machineName == "Test Machine" ? Test_Socket : Mock_Socket}
      />
    );
  };
  const { data, isSuccess, isError, error } =
    useGetFactoryEquipmentsDataQuery();
  let content: JSX.Element = (
    <View style={styles.loadingcontainer}>
      <ActivityIndicator
        size={40}
        animating={true}
        color={colors.HeadingColor}
      />
      <Text style={styles.loadingtext}>loading ...</Text>
    </View>
  );
  if (isSuccess) {
    const equipmentdata: Array<equipment_card_item_data> = [];
    data.forEach((item: fetcheddata_schema) => {
      equipmentdata.push({
        id: item.id,
        machineName: item.name,
        icon: { iconlibrary: item.icon_library, iconname: item.icon_name },
        mean_speed: item.mean_speed,
        mean_temp: item.mean_temp,
      });
    });
    const equipmentstate = new Array<equipmentState>();
    equipmentdata.forEach((item) => {
      equipmentstate.push({ name: item.machineName, isOn: true });
    });
    dispatch(setEquipements(equipmentstate));
    content = (
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          data={equipmentdata}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  } else if (isError) {
    //add a logging and monitoring system
    console.log(error);
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.ScreenBackroundColor,
  },
  loadingcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingtext: {
    marginStart: 10,
    marginTop: 5,
  },
});

export default HomeScreen;
