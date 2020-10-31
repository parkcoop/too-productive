import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState, useContext } from "react";
import { signUp } from "../../../api";
import { SessionContext } from "../../../context";

const Register = () => {
  let { dispatch } = useContext(SessionContext);
  let [username, setUsername] = useState<string>('');
  let [password, setPassword] = useState<string>('');
  let [fullName, setFullName] = useState<string>('');

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ margin: 15 }}>
        <Text>Display Name</Text>
        <Input value={fullName} onChangeText={(e) => setFullName(e)} />
      </Layout>
      <Layout style={{ margin: 15 }}>
        <Text>Username</Text>
        <Input value={username} onChangeText={(e) => setUsername(e)} />
      </Layout>
      <Layout style={{ margin: 15 }}>
        <Text>Password</Text>
        <Input value={password} onChangeText={(e) => setPassword(e)} />
      </Layout>
      <Button
        onPress={async () => {
          console.log(username, "sign up");
          let newUser = await signUp({ username, password, fullName });
          dispatch({ type: "SIGN_IN", token: newUser.token, user: newUser.user });
          console.log(newUser);
        }}
      >
        LOGIN
      </Button>
    </Layout>
  );
};

export default Register;
