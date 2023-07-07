import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import colors from "../constants/colors";
import properties from "../constants/Properties";
import GeneralStatsCard from "./Cards/GeneralStatsCard";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { DomainPropType } from "victory-core";
import Heading from "./Headings";
import { IsMocked } from "../context/MockedorTestContext";
import { MOCK_SOCKET_URL, TEST_MACHINE_SOCKET_URL } from "@env";
import { getEquipemntName } from "../context/EquipmentNameContext";
import { useAppSelector } from "../hooks/useTypedRedux";

export type DataType = "General" | "Speed" | "Temprature";

const StatsDisplayFragment = (): JSX.Element => {
  const [chartOrcard, setchartorcard] = useState<DataType>("General");
  const url: string = IsMocked() ? MOCK_SOCKET_URL : TEST_MACHINE_SOCKET_URL;
  const ws = new WebSocket(url);
  useEffect(() => {
    ws.onopen = () => {
      //add logging and monitoring
      console.log("connected");
    };
    ws.onerror = (event) => {
      //add logging and monitoring
      console.log("error");
      console.log(event);
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <>
      <ScrollView style={styles.chipscroll} horizontal>
        <Chip
          style={styles.chip}
          icon="information"
          onPress={() => {
            setchartorcard("General");
          }}
        >
          {" "}
          General stats{" "}
        </Chip>
        <Chip
          style={styles.chip}
          icon="information"
          onPress={() => {
            setchartorcard("Speed");
          }}
        >
          {" "}
          speed{" "}
        </Chip>
        <Chip
          style={styles.chip}
          icon="information"
          onPress={() => {
            setchartorcard("Temprature");
          }}
        >
          {" "}
          temprature{" "}
        </Chip>
      </ScrollView>
      <GraphAndAnalyticsCardsDisplay datatype={chartOrcard} ws={ws} />
    </>
  );
};

type SpecificDataAnalyticsProp = { datatype: DataType; ws: WebSocket };

const GraphAndAnalyticsCardsDisplay = (props: SpecificDataAnalyticsProp) => {
  const [graphdata, setgraphdata] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
  ]);
  const [domain, setdomain] = useState<DomainPropType>({
    x: [0, 10],
    y: [0, 10],
  });
  const heading: string = props.datatype === "Speed" ? "Speed" : "Temprature";
  let grapharray: Array<number> = [];
  const [speed, setSpeed] = useState(0);
  const [temp, setTemp] = useState(0);
  const equipmentname = getEquipemntName();
  const isOn = useAppSelector((state) => state.equipment).filter(
    (item) => item.name == equipmentname
  )[0].isOn;
  useEffect(() => {
    if (isOn) {
      if (props.datatype === "General") {
        props.ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data) as {
            speed: number;
            temp: number;
          };
          setSpeed(data.speed);
          setTemp(data.temp);
        };
      } else {
        setgraphdata([{ x: 0, y: 0 }]);
        if (props.datatype === "Speed") {
          setdomain({ x: [0, 9], y: [100, 150] });
        } else {
          setdomain({ x: [0, 9], y: [10, 40] });
        }
        props.ws.onmessage = (event: MessageEvent) => {
          const data = JSON.parse(event.data) as {
            speed: number;
            temp: number;
          };
          const newvalue = props.datatype === "Speed" ? data.speed : data.temp;
          if (grapharray.length == 10) {
            grapharray.shift();
            grapharray.push(newvalue);
          } else {
            grapharray.push(newvalue);
          }
          const length = grapharray.length;
          const newgraphdata = grapharray.map((value, index) => {
            let pos = length - (index + 1);
            return { x: pos, y: value };
          });
          setgraphdata(newgraphdata);
        };
      }
    } else {
      setgraphdata([{ x: 0, y: 0 }]);
      setdomain({ x: [0, 10], y: [0, 10] });
      setSpeed(0);
      setTemp(0);
    }
    return () => {
      grapharray = [];
      props.ws.onmessage = () => {};
    };
  }, [props.datatype, isOn]);
  if (props.datatype === "General") {
    return (
      <View style={styles.generalStatsContainer}>
        <GeneralStatsCard
          units="°c"
          dataTypeString="Temprature"
          dataValue={temp}
          dataicon={{ iconlibrary: "FontAwesome", iconname: "thermometer" }}
        />
        <GeneralStatsCard
          units="m/s"
          dataTypeString="Speed"
          dataValue={speed}
          dataicon={{
            iconlibrary: "MaterialCommunityIcons",
            iconname: "speedometer",
          }}
        />
        <GeneralStatsCard
          units="days"
          dataTypeString="Healthy days"
          dataValue={5}
          dataicon={{ iconlibrary: "AntDesign", iconname: "checkcircleo" }}
        />
        <GeneralStatsCard
          units=" "
          dataTypeString="Health score"
          dataValue={9}
          dataicon={{
            iconlibrary: "MaterialIcons",
            iconname: "healing",
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={{ margin: 5 }}>
        <Heading heading={heading} marginvertical={0} />
        <VictoryChart theme={VictoryTheme.material} height={300}>
          <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: "rgb(134, 65, 244)" },
            }}
            data={graphdata}
            domain={domain}
          />
        </VictoryChart>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  chipscroll: {
    margin: 2,
  },
  chip: {
    margin: 3,
  },
  generalStatsContainer: {
    backgroundColor: "#F5F5F5",
    height: 300,
    width: "100%",
    borderColor: colors.CardTableBorderColor,
    borderWidth: properties.CardOrContainerBorderWidth,
    borderRadius: properties.CardOrContainerBorderRadius,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignContent: "space-around",
  },
  lineChartContainer: {
    height: 200,
    width: "100%",
    borderWidth: properties.CardOrContainerBorderWidth,
    borderColor: colors.CardTableBorderColor,
    marginVertical: 5,
    borderRadius: properties.CardOrContainerBorderRadius,
  },
});

export default StatsDisplayFragment;
