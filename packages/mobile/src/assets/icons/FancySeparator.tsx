import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg";

type FancySeparatorProps = {
  color: string;
  style: StyleProp<ViewStyle>;
};

const FancySeparator = (props: FancySeparatorProps) => (
  <Svg width={6} height={24.37} {...props}>
    <G data-name="Group 49" transform="translate(.296)" />
    <Path
      data-name="Line 4"
      fill="none"
      stroke={props.color}
      d="M2.901 0v24.37"
    />
    <Circle
      data-name="Ellipse 29"
      cx={3}
      cy={3}
      r={3}
      transform="translate(-.296 9.605)"
      fill={props.color}
    />
  </Svg>
);

export default FancySeparator;
