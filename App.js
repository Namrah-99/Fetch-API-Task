import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Header,
  Text,
  Left,
  Body,
  Right,
  Card,
  CardItem,
} from "native-base";

import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
  Octicons,
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const HomeScreen = ({ navigation }) => {
  const [get_data, set_data] = React.useState([]);
  const [is_Load, set_Load] = React.useState(true);
  React.useEffect(() => {
    fetching_Data();
  }, []);
  const fetching_Data = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((responseJson) => {
        set_Load(false);
        set_data(responseJson);
      })
      .catch((er) => {
        console.error(er);
      });
  };

  if (is_Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>
          Please Wait Untill data gets loaded from JSON placeholder API
        </Text>
      </View>
    );
  }
  return (
    <Container>
      <Content style={{ width: "100%" }}>
        <Header>
          <Body style={{ alignItems: "flex-start", paddingLeft: 17 }}>
            <Text style={styles.text2}>Users Name and Email</Text>
          </Body>
        </Header>
        <Body style={{ width: "96%" }}>
          <List
            style={{ width: "100%" }}
            dataArray={get_data}
            renderRow={(item) => {
              return (
                <ListItem style={{ backgroundColor: "white" }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate("BottomTabs", {
                        userId: item.id,
                        userData: item,
                      })
                    }
                    style={styles.cont}
                  >
                    <Card>
                      <CardItem>
                        <Body
                          style={{
                            flexDirection: "row",
                            padding: 25,
                          }}
                        >
                          <MaterialCommunityIcons
                            name="account-arrow-right"
                            size={28}
                            color="#C2185B"
                          />
                          <View style={[styles.space2, { paddingLeft: 25 }]}>
                            <Text
                              style={[
                                styles.text,
                                { textAlign: "left", color: "navy" },
                              ]}
                            >
                              {item.name}
                            </Text>
                            <Text
                              note
                              style={[
                                styles.text,
                                { textAlign: "left", color: "navy" },
                              ]}
                            >
                              {item.email}
                            </Text>
                          </View>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </ListItem>
              );
            }}
          ></List>
        </Body>
      </Content>
    </Container>
  );
};

const Tab = createMaterialBottomTabNavigator();
function BottomTabs({ navigation, route }) {
  const userId = route.params.userId;
  const userData = route.params.userData;
  return (
    <Tab.Navigator
      //initialRouteName="UserDetails"
      activeColor="azure"
      inactiveColor="#f0edf6"
      shifting={true}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="UserDetails"
        component={() => (
          <UserDetails navigation={navigation} userId={userId} />
        )}
        options={{
          tabBarColor: "#B71C1C",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Albums"
        component={() => (
          <Albums navigation={navigation} route={route} userId={userId} />
        )}
        options={{
          tabBarColor: "#0D47A1",
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Posts"
        component={() => (
          <Posts navigation={navigation} userId={userId} userData={userData} />
        )}
        options={{
          //tabBarBadge: true,
          tabBarColor: "#880E4F",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Todos"
        component={() => (
          <Todos navigation={navigation} userId={userId} userData={userData} />
        )}
        options={{
          tabBarColor: "#006064",
          tabBarIcon: ({ color }) => (
            <Octicons name="checklist" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const UserDetails = (props) => {
  const id = props.userId;
  let url = `https://jsonplaceholder.typicode.com/users/${props.userId}`;
  const [fetching_data, setfetching_data] = React.useState(false);
  const [get_data, set_data] = React.useState();
  React.useEffect(() => {
    Json_APIcall();
  }, []);
  const Json_APIcall = () => {
    setfetching_data(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setfetching_data(false);
        set_data(json);
        //        console.log(json);
      });
  };
  return (
    <Container>
      <Header style={{ backgroundColor: "#B71C1C" }}>
        <Body>
          <Text style={styles.text2}>User Details</Text>
        </Body>
        <Right>
          <MaterialCommunityIcons
            name="account-details"
            size={30}
            color="white"
          />
        </Right>
      </Header>
      <Content style={{ width: "100%" }}>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#B71C1C",
                    fontWeight: "bold",
                  }}
                >
                  INFORMATION
                </Text>
                <View style={styles.space}>
                  <Text style={styles.udtext}>ID</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? id : ""}
                    {"\n"}
                  </Text>
                </View>
                <View style={styles.space}>
                  <Text style={styles.udtext}>Name</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.name : ""}
                    {"\n"}
                  </Text>
                </View>
                <View style={styles.space}>
                  <Text style={styles.udtext}>UserName</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.username : ""}
                    {"\n"}
                  </Text>
                </View>
                <View style={styles.space}>
                  <Text style={styles.udtext}>Email</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.email : ""}
                    {"\n"}
                  </Text>
                </View>
                <View style={styles.space}>
                  <Text style={styles.udtext}>Phone</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.phone : ""}
                    {"\n"}
                  </Text>
                </View>
                <View style={styles.space}>
                  <Text style={styles.udtext}>Website</Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.website : ""}
                  </Text>
                </View>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#B71C1C",
                    fontWeight: "bold",
                  }}
                >
                  ADDRESS
                </Text>
                <View style={styles.space}>
                  <Text style={styles.udtext}>
                    Street{"\n"}Suit{"\n"}City{"\n"}Zipcode{"\n"}
                    Geo-lat{"\n"}Geo-lng{"\n"}
                  </Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.address.street : ""}
                    {"\n"}
                    {get_data != undefined ? get_data.address.suite : ""}
                    {"\n"}
                    {get_data != undefined ? get_data.address.city : ""}
                    {"\n"}
                    {get_data != undefined ? get_data.address.zipcode : ""}
                    {"\n"}
                    {get_data != undefined ? get_data.address.geo.lat : ""}
                    {"\n"}
                    {get_data != undefined ? get_data.address.geo.lng : ""}
                    {"\n"}
                  </Text>
                </View>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#B71C1C",
                    fontWeight: "bold",
                  }}
                >
                  COMPANY
                </Text>
                <View style={styles.space}>
                  <Text style={styles.udtext}>
                    Name{"\n"}
                    {"\n"}CatchPhrase{"\n"}
                    {"\n"}Bs{"\n"}
                  </Text>
                  <Text style={[styles.udtext, { textAlign: "right" }]}>
                    {get_data != undefined ? get_data.company.name : ""}
                    {"\n"}
                    {"\n"}
                    {get_data != undefined ? get_data.company.catchPhrase : ""}
                    {"\n"}
                    {"\n"}
                    {get_data != undefined ? get_data.company.bs : ""}
                    {"\n"}
                  </Text>
                </View>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const Albums = (props) => {
  const id = props.userId;
  //console.log(id);
  let url = `https://jsonplaceholder.typicode.com/users/${props.userId}/albums`;
  const [is_Load, set_Load] = React.useState(true);
  const [get_data, set_data] = React.useState([]);

  const fetching_Data = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        set_Load(false);
        set_data(responseJson);
      })
      .catch((er) => {
        console.error(er);
      });
  };
  React.useEffect(() => {
    fetching_Data();
  }, []);
  if (is_Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>
          Please Wait Untill data gets loaded from JSON placeholder API
        </Text>
      </View>
    );
  } else {
    return (
      <Container>
        <Content style={{ width: "100%" }}>
          <Header style={{ backgroundColor: "#0D47A1" }}>
            <Body style={{ textAlign: "center", alignItems: "center" }}>
              <Text style={styles.text2}>Albums Name</Text>
            </Body>
          </Header>
          <List
            dataArray={get_data}
            renderRow={(item) => {
              //             console.log(item);
              return (
                <ListItem>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      props.navigation.navigate("AlbumsDetails", {
                        albumId: item.id,
                      })
                    }
                    style={styles.cont}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          width: "90%",
                          fontSize: 14,
                          textAlign: "left",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Entypo
                        name="chevron-with-circle-right"
                        size={23}
                        color="#0D47A1"
                        style={{
                          width: "10%",
                          textAlign: "right",
                          alignSelf: "center",
                          fontWeight: "bold",
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </ListItem>
              );
            }}
          ></List>
        </Content>
      </Container>
    );
  }
};

const AlbumsDetails = ({ navigation, route }) => {
  const albumId = route.params.albumId;
  let url = `https://jsonplaceholder.typicode.com/albums/${route.params.albumId}/photos`;
  const [is_Load, set_Load] = React.useState(true);
  const [get_data, set_data] = React.useState([]);
  const fetching_Data = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        set_Load(false);
        set_data(responseJson);
      })
      .catch((er) => {
        console.error(er);
      });
  };
  React.useEffect(() => {
    fetching_Data();
  }, []);
  if (is_Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }
  return (
    <Container>
      <Content>
        <Header style={{ backgroundColor: "#0D47A1" }}>
          <Body style={{ textAlign: "center", alignItems: "center" }}>
            <Text style={styles.text2}>Albums Titles and Thumbnails</Text>
          </Body>
        </Header>
        <List
          dataArray={get_data}
          renderRow={(item) => {
            return (
              <ListItem thumbnail>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    navigation.navigate("AlbumsPhoto", {
                      albumid: item.albumId,
                      photourl: item.url,
                      title: item.title,
                    })
                  }
                  style={styles.cont}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 4,
                      paddingRight: 18,
                    }}
                  >
                    <Thumbnail square source={{ uri: item.thumbnailUrl }} />
                    <Text
                      note
                      style={{ alignContent: "stretch", paddingLeft: 6 }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ListItem>
            );
          }}
        ></List>
      </Content>
    </Container>
  );
};

const AlbumsPhoto = ({ navigation, route }) => {
  const phurl = route.params.photourl;
  const title = route.params.title;
  //console.log(phurl);
  return (
    <Container>
      <Header style={{ backgroundColor: "#0D47A1" }}>
        <Body style={{ textAlign: "center", alignItems: "center" }}>
          <Text style={styles.text2}>Albums Photo</Text>
        </Body>
      </Header>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: phurl }} />
              <Body>
                <Text>Album Photo Title</Text>
                <Text note>{title}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: phurl }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const Posts = (props) => {
  const id = props.userId;
  // console.log(id);
  let url = `https://jsonplaceholder.typicode.com/users/${props.userId}/posts`;
  const [get_data, set_Data] = React.useState([]);
  const [is_Load, set_Load] = React.useState(true);

  const fetching_Data = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        set_Load(false);
        set_Data(responseJson);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  React.useEffect(() => {
    fetching_Data();
  }, []);
  if (is_Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>
          Please Wait Untill data gets loaded from JSON placeholder API
        </Text>
      </View>
    );
  }
  return (
    <Container>
      <Header style={{ backgroundColor: "#880E4F" }}>
        <Body style={{ textAlign: "center", alignItems: "center" }}>
          <Text style={styles.text2}>Posts Title</Text>
        </Body>
      </Header>
      <Content style={{ width: "100%" }}>
        <List
          dataArray={get_data}
          renderRow={(item) => {
            return (
              <ListItem>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    props.navigation.navigate("PostsDetails", {
                      postId: item.id,
                    })
                  }
                  style={styles.cont}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        width: "90%",
                        fontSize: 14,
                        textAlign: "left",
                      }}
                    >
                      {item.title}
                    </Text>
                    <MaterialCommunityIcons
                      name="comment-arrow-right-outline"
                      size={24}
                      color="#880E4F"
                      style={{
                        width: "10%",
                        textAlign: "right",
                        alignSelf: "center",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </ListItem>
            );
          }}
        ></List>
      </Content>
    </Container>
  );
};

const PostsDetails = ({ navigation, route }) => {
  const postId = route.params.postId;
  let url = `https://jsonplaceholder.typicode.com/posts/${route.params.postId}/comments`;

  const [getData, setData] = React.useState([]);
  const [isLoad, setLoad] = React.useState(true);
  const fetching_Data = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setLoad(false);
        setData(responseJson);
      })
      .catch((error) => {
        //       console.error(error);
      });
  };
  React.useEffect(() => {
    fetching_Data();
  }, []);
  if (isLoad) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>
          Please Wait Untill data gets loaded from JSON placeholder API
        </Text>
      </View>
    );
  }
  return (
    <Container>
      <Header style={{ backgroundColor: "#880E4F" }}>
        <Body style={{ textAlign: "center", alignItems: "center" }}>
          <Text style={styles.text2}>Posts Comments</Text>
        </Body>
      </Header>
      <Content style={{ width: "100%" }}>
        <List
          dataArray={getData}
          renderRow={(item) => {
            return (
              <ListItem style={{}}>
                <Card style={{ width: "100%" }}>
                  <CardItem>
                    <Left style={{ justifyContent: "flex-start" }}>
                      <Body>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.name}
                        </Text>
                      </Body>
                      <MaterialCommunityIcons
                        name="post-outline"
                        size={24}
                        color="#880E4F"
                      />
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text
                        note
                        style={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {item.body}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <MaterialCommunityIcons
                      name="gmail"
                      size={24}
                      color="#880E4F"
                      style={{ width: "20%", textAlign: "left" }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        width: "80%",
                        textAlign: "right",
                      }}
                    >
                      {item.email}
                    </Text>
                  </CardItem>
                </Card>
              </ListItem>
            );
          }}
        ></List>
      </Content>
    </Container>
  );
};

const Todos = (props) => {
  let url = `https://jsonplaceholder.typicode.com/users/${props.userId}/todos`;
  const [is_Load, set_Load] = React.useState(true);
  const [get_data, set_data] = React.useState([]);

  const fetching_Data = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        set_Load(false);
        set_data(responseJson);
      })
      .catch((ero) => {
        console.error(ero);
      });
  };
  React.useEffect(() => {
    fetching_Data();
  }, []);
  if (is_Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>
          Please Wait Untill data gets loaded from JSON placeholder API
        </Text>
      </View>
    );
  }
  return (
    <Container>
      <Content>
        <Header style={{ backgroundColor: "#006064" }}>
          <Body>
            <Text style={styles.text2}>Todos Title</Text>
          </Body>
          <Right>
            <Text style={styles.text2}>Todos Completed</Text>
          </Right>
        </Header>
        <List
          dataArray={get_data}
          renderRow={(item) => {
            return (
              <ListItem>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      width: "90%",
                      fontSize: 14,
                      textAlign: "left",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      width: "10%",
                      fontSize: 14,
                      textAlign: "right",
                    }}
                  >
                    {item.completed == true ? (
                      <AntDesign
                        name="checksquareo"
                        size={18}
                        color="#4DB6AC"
                        style={{
                          width: "10%",
                          textAlign: "right",
                          alignSelf: "center",
                        }}
                      />
                    ) : (
                      <AntDesign
                        name="closesquareo"
                        size={18}
                        color="#006064"
                        style={{
                          width: "10%",
                          textAlign: "right",
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </Text>
                </View>
              </ListItem>
            );
          }}
        ></List>
      </Content>
    </Container>
  );
};

function MainHeader({ navigation, route }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "#C2185B", fontSize: 20, fontWeight: "bold" }}>
        USERS LIST
      </Text>
      <FontAwesome5
        name="users-cog"
        size={30}
        color="#C2185B"
        style={{ alignItems: "center", marginHorizontal: 18 }}
      />
    </View>
  );
}

const StackN = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <StackN.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          title: "Welcome to our world",
        }}
      >
        <StackN.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "List of users",
            //headerShown: false,
            headerTitleAlign: "center",
            headerTintColor: "blue",
            headerStyle: {
              //backgroundColor: 'blue',
            },
            headerTitle: (props) => <MainHeader {...props} />,
          }}
        />
        <StackN.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            title: "Bottom Tab Navigator",
          }}
        />
        <StackN.Screen
          name="AlbumsDetails"
          component={AlbumsDetails}
          options={{
            title: "ALBUMS",
          }}
        />
        <StackN.Screen
          name="PostsDetails"
          component={PostsDetails}
          options={{
            title: "POSTS",
          }}
        />
        <StackN.Screen
          name="AlbumsPhoto"
          component={AlbumsPhoto}
          options={{
            title: "ALBUMS",
          }}
        />
      </StackN.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  space: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  space2: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  cont: {
    width: "100%",
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  udtext: {
    fontSize: 14,
  },
});
