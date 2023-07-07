import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screen_names } from "../constants/ScreenNames";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import SpeedControlComponent from "../components/SpeedControlComponent";
import Heading from "../components/Headings";
import EquipmentInformationTable from "../components/EquipmentInformationTable";
import colors from "../constants/colors";
import StatsDisplayFragment from "../components/StatsDisplayFragment";
import { RootStackParamList } from "../types/navigation";
import MockedorTestProvider from "../context/MockedorTestContext";
import EquipmentNameProvider from "../context/EquipmentNameContext";

const EquipmentScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<
  RootStackParamList,
  screen_names.EQUIPMENT,
  undefined
>) => {
  const mocked: boolean = route.params.Equipemt_name != "Test machine";
  return (
    <SafeAreaView style={styles.container}>
      <MockedorTestProvider isMocked={mocked}>
        <EquipmentNameProvider equipmentname={route.params.Equipemt_name}>
          <ScrollView>
            <Heading heading="ANALYTICS" />
            <StatsDisplayFragment />
            <Heading heading="EQUIPMENT INFORMARTION" />
            <EquipmentInformationTable />
            <Heading heading="SPEED CONTROL" />
            <SpeedControlComponent />
          </ScrollView>
        </EquipmentNameProvider>
      </MockedorTestProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: colors.ScreenBackroundColor,
  },
});

export default EquipmentScreen;
