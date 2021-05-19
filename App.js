import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Products, Employees, Orders } from "./assets/DummyLists.js";

const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ borderColor: "#F93822FF" }}>
        <Text style={styles.title}>Welcome to HomeScreen</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Products List")}
          style={styles.touchButtons}
        >
          GoTo Product Lists
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Employees List")}
          style={styles.touchButtons}
        >
          GoTo Employees List
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Orders List")}
          style={styles.touchButtons}
        >
          GoTo Orders List
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ProductsList = ({ navigation }) => {
  const [getPList, setPList] = useState(Products);
  const scrollView = ( //const JSX statement
    <ScrollView style={styles.scrollview}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container3}>
          {getPList.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              //onPress={() => editItems(item)}
              onPress={() =>
                navigation.navigate("Product Details", {
                  key: item.key,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  color: item.color,
                  brand: item.brand,
                  size: item.size,
                  category: item.category,
                })
              }
              style={styles.touchProducts}
            >
              <Text
                style={{ fontSize: 12, textAlign: "center", paddingRight: 15 }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingRight: 10,
                }}
              >
                {item.price}
              </Text>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
  const emptyScrollView = (
    <View style={{ alignItems: "center", paddingTop: 20 }}>
      <Text style={{ fontSize: 20, fontStyle: "italic", color: "grey" }}>
        No Product Available
      </Text>
    </View>
  );
  return (
    <View style={styles.container1}>
      <Text style={styles.titleT}>Welcome to Products List</Text>

      <View>{getPList.length <= 0 ? emptyScrollView : scrollView}</View>
      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ProductDetails = ({ navigation, route }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.titleT}>Welcome to Product Details</Text>

      <ScrollView style={styles.scrollDetails}>
        <View style={styles.space}>
          <Text style={styles.boldF}>Key</Text>
          <Text style={styles.simplePD}>
            {route.params.key}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Image</Text>
          <Image
            style={styles.imageStyle}
            source={{
              uri: route.params.image,
            }}
          />
        </View>

        <View style={styles.space}>
          <Text style={styles.boldF}>Name</Text>
          <Text style={styles.simplePD}>
            {route.params.name}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Price</Text>
          <Text style={styles.simplePD}>
            {route.params.price}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Color</Text>
          <Text style={styles.simplePD}>
            {route.params.color}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Brand</Text>
          <Text style={styles.simplePD}>
            {route.params.brand}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Size</Text>
          <Text style={styles.simplePD}>
            {route.params.size}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Category</Text>
          <Text style={styles.simplePD}>
            {route.params.category}
            {"\n"}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const EmployeesList = ({ navigation }) => {
  const [getEList, setEList] = useState(Employees);
  const scrollView = ( //const JSX statement
    <ScrollView style={styles.scrollview}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container3}>
          {getEList.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              //onPress={() => editItems(item)}
              onPress={() =>
                navigation.navigate("Employee Details", {
                  key: item.key,
                  name: item.name,
                  designation: item.designation,
                  phoneNumber: item.phoneNumber,
                  workingShift: item.workingShift,
                  address: item.address,
                  earning: item.earning,
                })
              }
              style={styles.touchProducts}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  paddingRight: 15,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingRight: 10,
                }}
              >
                {item.designation}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
  const emptyScrollView = (
    <View style={{ alignItems: "center", paddingTop: 20 }}>
      <Text style={{ fontSize: 20, fontStyle: "italic", color: "grey" }}>
        No Employee Available
      </Text>
    </View>
  );
  return (
    <View style={styles.container1}>
      <Text style={styles.titleT}>Welcome to Employees List</Text>

      <View>{getEList.length <= 0 ? emptyScrollView : scrollView}</View>
      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const EmployeeDetails = ({ navigation, route }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.titleT}>Welcome to Employee Dtails</Text>
      <ScrollView style={styles.scrollDetails}>
        <View style={styles.space}>
          <Text style={styles.boldF}>Key</Text>
          <Text style={styles.simplePD}>
            {route.params.key}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Employee Name</Text>
          <Text style={styles.simplePD}>
            {route.params.name}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Designation</Text>
          <Text style={styles.simplePD}>
            {route.params.designation}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Phone Number</Text>
          <Text style={styles.simplePD}>
            {route.params.phoneNumber}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Working Shift</Text>
          <Text style={styles.simplePD}>
            {route.params.workingShift}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Address</Text>
          <Text style={styles.simplePD}>
            {route.params.address}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Earning</Text>
          <Text style={styles.simplePD}>
            {route.params.earning}
            {"\n"}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const OrdersList = ({ navigation }) => {
  const [getOList, setOList] = useState(Orders);
  const scrollView = ( //const JSX statement
    <ScrollView style={styles.scrollview}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container3}>
          {getOList.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.7}
              //onPress={() => editItems(item)}
              onPress={() =>
                navigation.navigate("Order Details", {
                  key: item.key,
                  orderNo: item.orderNo,
                  productName: item.productName,
                  price: item.price,
                  customerInformation: item.customerInformation,
                  orderDate: item.orderDate,
                  shippingStatus: item.shippingStatus,
                })
              }
              style={styles.touchProducts}
            >
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  paddingRight: 15,
                }}
              >
                {item.orderNo}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingRight: 10,
                }}
              >
                {item.productName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingRight: 10,
                }}
              >
                {item.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
  const emptyScrollView = (
    <View style={{ alignItems: "center", paddingTop: 20 }}>
      <Text style={{ fontSize: 20, fontStyle: "italic", color: "grey" }}>
        No Orders Available
      </Text>
    </View>
  );
  return (
    <View style={styles.container1}>
      <Text style={styles.titleT}>Welcome to Orders List</Text>

      <View>{getOList.length <= 0 ? emptyScrollView : scrollView}</View>
      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const OrderDetails = ({ navigation, route }) => {
  return (
    <View style={styles.container2}>
      <Text style={styles.titleT}>Welcome to Order Dtails</Text>
      <ScrollView style={styles.scrollDetails}>
        <View style={styles.space}>
          <Text style={styles.boldF}>Key</Text>
          <Text style={styles.simplePD}>
            {route.params.key}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Order Number</Text>
          <Text style={styles.simplePD}>
            {route.params.orderNo}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Product Name</Text>
          <Text style={styles.simplePD}>
            {route.params.productName}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Product Price</Text>
          <Text style={styles.simplePD}>
            {route.params.price}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Customer Information</Text>
          <Text style={styles.simplePD}>
            {route.params.customerInformation}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Order Date</Text>
          <Text style={styles.simplePD}>
            {route.params.orderDate}
            {"\n"}
          </Text>
        </View>
        <View style={styles.space}>
          <Text style={styles.boldF}>Shipping Status</Text>
          <Text style={styles.simplePD}>
            {route.params.shippingStatus}
            {"\n"}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.space}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={styles.touchBPL}
        >
          Back
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.popToTop()}
          style={styles.touchBPL}
        >
          {" "}
          GoTo HOME{" "}
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
        <Stack.Screen name="Products List" component={ProductsList} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
        <Stack.Screen name="Employees List" component={EmployeesList} />
        <Stack.Screen name="Employee Details" component={EmployeeDetails} />
        <Stack.Screen name="Orders List" component={OrdersList} />
        <Stack.Screen name="Order Details" component={OrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    //backgroundColor: '#cbf6db',

    backgroundColor: "#FEE715FF",
    padding: 8,
  },
  container1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFC107",
    padding: 8,
  },
  container2: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: "#FCB900",
    padding: 8,
  },
  container3: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFEB3B",
    margin: 10,
  },
  scrollDetails: {
    backgroundColor: "#fff1e1",
    width: "100%",
    margin: 3,
    justifyContent: "center",
  },
  scrollview: {
    width: "100%",
    margin: 3,
  },
  title: {
    fontSize: 22,
    //color: '#05716c',
    color: "#101820FF",
    textAlign: "center",
    padding: 5,
    margin: 20,
    marginBottom: 60,
    fontWeight: "bold",
  },
  titleT: {
    fontSize: 18,
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: "white",
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
  touchBPL: {
    //backgroundColor: '#9bc472',
    //color: 'white',
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
  space: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 27,
    width: 27,
    resizeMode: "stretch",
    alignItems: "center",
    borderRadius: 50,
    outline: 5,
    outlineColor: "black",
  },
  boldF: {
    fontWeight: "bold",
    color: "coral",
  },
  simplePD: {
    color: "#FF9800",
  },
});
