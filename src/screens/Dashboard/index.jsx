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
    <Layout style={{ flex: 1, padding: 15 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 25 }}>Welcome</Text>
        <Text style={{ fontSize: 35 }}>{session?.user.username}</Text>
        <Divider
          style={{
            backgroundColor: "#CDCDCD",
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <Layout
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ marginTop: 15, marginBottom: 15 }}>Quick Actions</Text>
          <Button onPress={() => navigation.navigate("Notes")}>
            TAKE NOTES
          </Button>
          <Text style={{ marginTop: 15, marginBottom: 15 }}>Recent Notes</Text>
          <Text style={{ marginTop: 15, marginBottom: 15 }}>
            Upcoming Reminders
          </Text>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default Dashboard;
