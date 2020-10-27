import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState, useContext } from "react";
import { showMessage } from "react-native-flash-message";
import { login } from "../../../api";
import { SessionContext } from "../../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const Login = ({ navigation }) => {
  let { dispatch, user } = useContext(SessionContext);
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ margin: 15 }}>
        <Text>Username</Text>
        <Input value={username} onChangeText={(e) => setUsername(e)} />
      </Layout>
      <Layout style={{ margin: 15 }}>
        <Text>Password</Text>
        <Input
          value={password}
          password={true}
          secureTextEntry
          onChangeText={(e) => setPassword(e)}
        />
      </Layout>
      <Button
        onPress={async () => {
          // console.log("LLLL", username, password);
          let user = await login({ username, password });
          console.log("PLEASE", user);
          if (!user) return;
          // showMessage({ type: "error", message: " OMGF" });
          try {
            await AsyncStorage.setItem("token", user.token);
            await AsyncStorage.setItem(
              "tokenExpiration",
              JSON.stringify(moment().add(2, "hours").unix())
            );
          } catch (err) {
            console.log("Error setting token in storage", err);
          }
          dispatch({ type: "SIGN_IN", ...user });
        }}
      >
        LOGIN
      </Button>
      <Button
        onPress={async () => {
          navigation.navigate("Register");
        }}
      >
        Need an account? Register here
      </Button>
    </Layout>
  );
};

export default Login;
