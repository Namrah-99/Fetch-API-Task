import * as React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
const CustomButton = (props) => {
  var btncolor;
  if (props.disabled) {
    btncolor = "grey";
  } else {
    btncolor = props.color != undefined ? props.color : "blue";
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPressEvent}
      disabled={props.disabled}
    >
      <View
        style={{
          ...styles.buttonView,
          backgroundColor: btncolor,
          fontSize: props.fontSize,
          borderRadius: props.borderR,
          padding: props.paddin,
        }}
      >
        <Text style={styles.buttonText}>{props.text} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    color: "white",
    textAlign: "center",
    borderRadius: 70,
    fontSize: 16,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
  },
});
export default CustomButton;
