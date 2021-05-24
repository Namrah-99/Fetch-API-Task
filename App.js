import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Keyboard,
  Alert,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomButton from "./assets/AssetExample.js";
import { listItems } from "./assets/DummyLists.js";
var Calculations = [];
const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container4}>
      <View style={{ borderColor: "#F93822FF" }}>
        <Text style={styles.title}>Welcome to Discount App</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Start")}
          style={styles.touchButtons}
        >
          <Text style={styles.titleT}>GoTo Start Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const StartScreen = ({ navigation }) => {
  const [getOriginalvalue, setOriginalvalue] = useState("");
  const [getDiscountPercentage, setDiscountPercentage] = useState("");
  const [getSave, setSave] = useState(0.0);
  const [getFinal, setFinal] = useState(0.0);
  const [getList, setList] = useState(listItems);
  const [getEditItem, setEditItem] = useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          title="View"
          activeOpacity={0.5}
          style={styles.tTButtons}
          onPress={() =>
            navigation.navigate("View History List", { lists: getList })
          }
        >
          <Text style={styles.txtTouch}>History</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, getList]);
  const showAlert = () => {
    alert(
      "Input values should be positive digits only. \n Discount value should be between 0 and 100. \n Retry"
    );
    setOriginalvalue(0);
    setDiscountPercentage(0);
    setSave(0.0);
    setFinal(0.0);
  };
  const onOFocusChange = () => {
    setOriginalvalue("");
  };
  const onDFocusChange = () => {
    setDiscountPercentage("");
  };
  const compute = (text1, text2) => {
    if (!isNaN(text1) && !isNaN(text2) && text2 >= 0 && text2 <= 100) {
      setOriginalvalue(text1);
      setDiscountPercentage(text2);
      let discount = (text2 * text1) / 100;
      setSave(parseFloat(discount).toFixed(2));
      let saleprice = text1 - (text2 * text1) / 100;
      setFinal(parseFloat(saleprice).toFixed(2));
    } else if (isNaN(text1) || isNaN(text2) || text2 < 0 || text2 > 100) {
      showAlert();
    }
  };
  const addItems = () => {
    setList([
      ...getList,
      {
        key: Math.random().toString(),
        originalPrice: getOriginalvalue,
        discount: getDiscountPercentage,
        finalPrice: getFinal,
      },
    ]);
    Calculations.push({
      key: Math.random().toString(),
      originalPrice: getOriginalvalue,
      discount: getDiscountPercentage,
      finalPrice: getFinal,
    });
    setOriginalvalue("");
    setDiscountPercentage("");
    Keyboard.dismiss();
  };
  const check = (original, disc) => {
    var exist = Calculations.filter(
      (item) => item.originalPrice == original && item.discount == disc
    );

    if (exist.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ borderColor: "#F93822FF" }}>
        <View style={styles.containerD}>
          <Text style={styles.titleTH}>DISCOUNT APP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder=" Enter Original Value "
              onChangeText={(text1) => compute(text1, getDiscountPercentage)}
              value={getOriginalvalue}
              keyboardType="numeric"
              onFocus={onOFocusChange}
            />
            <TextInput
              style={styles.textInput}
              placeholder=" Enter Discount % "
              onChangeText={(text2) => compute(getOriginalvalue, text2)}
              value={getDiscountPercentage}
              keyboardType="numeric"
              onFocus={onDFocusChange}
            />
          </View>
          <View>
            <View style={styles.modalview}>
              <Text style={styles.txt}>
                {"SAVE AMOUNT : "}
                {getSave}
              </Text>
            </View>
            <View style={styles.modalview}>
              <Text style={styles.txt}>
                {"FINAL AMOUNT : "}
                {getFinal}
              </Text>
            </View>
          </View>
          <CustomButton
            text={"Save"}
            color="#f57e7e"
            borderR={70}
            paddin={7}
            onPressEvent={addItems}
            disabled={
              (getOriginalvalue.length <= 0 &&
                getDiscountPercentage.length <= 0) ||
              (getOriginalvalue == 0 && getDiscountPercentage == 0) ||
              check(getOriginalvalue, getDiscountPercentage) == true
            }
          />
        </View>
      </View>
    </View>
  );
};
const ViewHistory = ({ navigation, route }) => {
  const [getPList, setPList] = useState(Calculations);
  const removeItems = (itemKey) => {
    var listitem = getPList.filter((item) => item.key != itemKey);
    setPList(listitem);
    Calculations = listitem;
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          title="Clear"
          activeOpacity={0.5}
          style={styles.tTButtons}
          onPress={() =>
            Alert.alert(
              "Clear History Calculations",
              "Do you want to clear history.",
              [
                { text: "No", style: "No" },
                {
                  text: "Yes",
                  onPress: () => {
                    setPList([]);
                    Calculations = [];
                  },
                },
              ]
            )
          }
        >
          <Text style={styles.txtTouch}>Clear</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, getPList]);
  return (
    <View style={styles.container1}>
      <Text style={styles.titleV}>Discount Calculations History</Text>
      <View style={styles.container2}>
        <ScrollView style={styles.scrollview}>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  padding: 10,
                  fontWeight: "bold",
                }}
              >
                {" Original Price"}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  padding: 10,
                  fontWeight: "bold",
                }}
              >
                {"Discount"}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  padding: 10,
                  fontWeight: "bold",
                }}
              >
                {"Final Price"}
              </Text>
            </View>
            <View style={styles.container3}>
              {getPList.map((item, index) => (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.7}
                  style={styles.touchProducts}
                >
                  <Text style={styles.txtP}>{item.originalPrice}</Text>
                  <Text style={styles.txtP}>{"-"}</Text>
                  <Text style={styles.txtP}>
                    {item.discount}
                    {"%"}
                  </Text>
                  <Text style={styles.txtP}>{"="}</Text>
                  <Text style={styles.txtP}>{item.finalPrice}</Text>
                  <TouchableOpacity onPress={() => removeItems(item.key)}>
                    <View style={styles.crossOuter}>
                      <Text style={styles.crossText}>X</Text>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          <Text style={styles.titlet}>GoToHOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home Screen"}
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home Screen"
          component={Homescreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            title: "Discount Calculations",
          }}
        />
        <Stack.Screen name="View History List" component={ViewHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEE715FF",
    padding: 8,
    paddingTop: 20,
  },
  container1: {
    flex: 1,
    backgroundColor: "#FFC107",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  container2: {
    flex: 1,
    padding: 0,
  },
  container3: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFEB3B",
    margin: 10,
  },
  container4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#FFEB3B",
    marginHorizontal: 10,
    marginVertical: 30,
  },
  containerD: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  scrollview: {
    width: "100%",
    padding: 0,
  },

  title: {
    fontSize: 22,
    color: "#101820FF",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleT: {
    fontSize: 18,
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
  },
  titleTH: {
    fontSize: 30,
    color: "midnightblue",
    textAlign: "center",
    margin: 0,
    padding: 0,
  },
  txt: {
    fontSize: 14,
    textAlign: "center",
    padding: 0,
    margin: 0,
  },
  txtTouch: {
    fontSize: 14,
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
  },
  titlet: {
    fontSize: 16,
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
  },
  titleV: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
  },
  txtP: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  touchButtons: {
    backgroundColor: "#f57e7e",
    color: "white",
    textAlign: "center",
    borderRadius: 70,
    padding: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  tTButtons: {
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    padding: 10,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  touchBPL: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    outline: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "coral",
    color: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
  },
  touchProducts: {
    backgroundColor: "honeydew",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    alignItems: "center",
    fontSize: 16,
    outline: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 18,
  },
  textInput: {
    borderColor: "red",
    borderBottomWidth: 2,
    //width: '70%',
    fontSize: 16,
    padding: 8,
    textAlign: "center",
    outlineColor: "red",
  },
  modalview: {
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  crossOuter: {
    width: 30,
    backgroundColor: "red",
    textAlign: "center",
    borderRadius: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  crossText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
