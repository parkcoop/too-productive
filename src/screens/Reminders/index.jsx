import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import NewReminder from "./components/NewReminder";

const Reminders = () => {
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const theme = useTheme();
  return (
    <Layout style={{ flex: 1, padding: 15 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NewReminder
          newReminderOpen={newReminderOpen}
          setNewReminderOpen={setNewReminderOpen}
        />
        <Text style={{ fontSize: 23 }}>Reminders</Text>
        <Button
          onPress={() => setNewReminderOpen(true)}
          style={{ width: "50%", alignSelf: "center", margin: 15 }}
        >
          New reminder
        </Button>
      </SafeAreaView>
    </Layout>
  );
};

export default Reminders;
