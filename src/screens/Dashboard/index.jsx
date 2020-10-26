import React, { useContext } from "react";
import {
  ApplicationProvider,
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  IconRegistry,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import RichTextEditor from "../../common/components/RichTextEditor";
import { SessionContext } from "../../context";

const Dashboard = ({ navigation }) => {
  const { session, dispatch } = useContext(SessionContext);
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Divider />
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button onPress={() => navigation.navigate("Notes")}>
            TAKE NOTES
          </Button>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default Dashboard;
