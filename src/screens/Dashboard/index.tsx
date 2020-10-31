import React, { useContext } from "react";
import {
  Button,
  Divider,
  Layout,
  Text,
} from "@ui-kitten/components";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../../context";

interface DashboardProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const { session } = useContext(SessionContext);
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
