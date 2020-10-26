import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { login } from "../../../api";
import { SessionContext } from "../../../context";

const Login = () => {
  let { dispatch, user } = useContext(SessionContext);
  return (
    <Layout style={{ flex: 1 }}>
      <Input style={{ backgroundColor: "grey", margin: 15 }} />
      <Input style={{ backgroundColor: "grey", margin: 15 }} />
      <Button
        onPress={async () => {
          let { user, token } = await login();
          console.log("WE HAVE TOKEN", token, user);
          dispatch({ type: "SIGN_IN", token, user });
        }}
      >
        LOGIN
      </Button>
    </Layout>
  );
};

export default Login;
