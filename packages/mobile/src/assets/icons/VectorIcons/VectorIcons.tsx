import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { StyleProp, ViewStyle } from "react-native";

type IconLibrary =
  | "FontAwesome"
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "MaterialCommunityIcons"
  | "MaterialIcons";

export type Icon = {
  iconname: string;
  iconlibrary: IconLibrary;
};

export type FactoryIconProp = {
  color: string;
  icon: Icon;
  iconsize?: number;
  iconstyle: StyleProp<ViewStyle>;
};

const VectorIcon = (props: FactoryIconProp) => {
  const { icon, color } = props;
  const iconsize = props.iconsize || 80;
  const style = props.iconstyle;
  //remove testID from individual icons and add it to the parent component
  switch (icon.iconlibrary) {
    case "AntDesign":
      return (
        <AntDesign
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "EvilIcons":
      return (
        <EvilIcons
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "Feather":
      return (
        <Feather
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={icon.iconname}
          color={color}
          style={style}
          size={iconsize}
          testID="vectoricon"
        />
      );
  }
};

export default VectorIcon;
