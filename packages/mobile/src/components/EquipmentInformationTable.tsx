import React from "react";
import definedcolor from "../constants/colors";
import { Text } from "react-native";
import { DataTable, useTheme } from "react-native-paper";

const EquipmentInformationTable = () => {
  const { fonts, colors } = useTheme();
  return (
    <DataTable style={{ borderWidth: 1, borderRadius: 5 }}>
      <DataTable.Header>
        <DataTable.Title textStyle={{ color: "black" }}>
          Specification
        </DataTable.Title>
        <DataTable.Title
          style={{ justifyContent: "flex-end" }}
          textStyle={{ color: "black" }}
        >
          Rating/Value
        </DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell textStyle={{ color: "black" }}>
          Rated speed
        </DataTable.Cell>
        <DataTable.Cell numeric textStyle={{ color: "black" }}>
          159
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell textStyle={{ color: "black" }}>
          Rated Torque
        </DataTable.Cell>
        <DataTable.Cell numeric textStyle={{ color: "black" }}>
          237
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

export default EquipmentInformationTable;
