import React from "react";
import { SafeAreaView, Image, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";
import Properties from "../constants/Properties";
import Heading from "../components/Headings";
import { Paragraph } from "react-native-paper";

const AboutScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 5,
        alignItems: "center",
        backgroundColor: colors.ScreenBackroundColor,
      }}
    >
      <Image
        source={require("../../assets/img/factory.png")}
        resizeMode="contain"
        style={{
          borderRadius: Properties.CardOrContainerBorderRadius,
          borderWidth: Properties.CardOrContainerBorderWidth,
        }}
      />
      <Heading heading="Who are we" marginvertical={10} />
      <Text style={styles.Paragraph}>
        Factory Analytics is a software company that specializes in providing
        solutions for factories with heavy machinery and equipment
        manufacturers. Their mobile app allows operators to remotely control
        heavy machinery and gather data for analytics from the machines. The app
        is designed to be user-friendly and intuitive, with a simple interface
        that makes it easy to navigate.
      </Text>
      <Text style={styles.Paragraph}>
        With Factory Analytics, operators can monitor their machines in
        real-time, identify issues before they become problems, and optimize
        their production processes. The app provides detailed analytics and
        insights into machine performance, allowing operators to make
        data-driven decisions about how to improve efficiency and reduce
        downtime.
      </Text>
      <Text style={styles.Paragraph}>
        Factory Analytics is committed to providing the highest level of service
        to their customers. We offer 24/7 support and are always available to
        answer questions or provide assistance.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Paragraph: {
    textAlign: "left",
    margin: 5,
  },
});

export default AboutScreen;
