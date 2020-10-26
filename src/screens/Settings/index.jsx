import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext, ThemeContext } from "../../context";

const StarIcon = (props) => <Icon {...props} name="star" />;

export default Settings = () => {
  const { dispatch, session } = useContext(SessionContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <SafeAreaView>
        <Text style={{ fontSize: 22 }}>Settings</Text>
        <Button
          status="danger"
          onPress={toggleTheme}
          accesoryLeft={StarIcon}
          style={{ width: "66%", margin: 33, alignSelf: "center" }}
        >
          {`Toggle ${theme === "dark" ? "light" : "dark"} theme`}
        </Button>
        <Button
          status="danger"
          onPress={() => dispatch({ type: "SIGN_OUT" })}
          accesoryLeft={StarIcon}
          style={{ width: "66%", margin: 33, alignSelf: "center" }}
        >
          Sign out
        </Button>
      </SafeAreaView>
    </Layout>
  );
};
