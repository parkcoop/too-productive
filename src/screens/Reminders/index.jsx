import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import Modal from "react-native-modal";
import { SessionContext } from "../../context";
import NewReminder from "./components/NewReminder";
import { getReminders } from "../../api";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminderOpen, setNewReminderOpen] = useState(false);
  const theme = useTheme();
  const { session } = useContext(SessionContext);

  const getUpcomingReminders = async () => {
    let allReminders = await getReminders(session.user._id);
    setReminders(allReminders.data);
  };

  useEffect(() => {
    getUpcomingReminders();
  }, []);

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
        {reminders?.map((reminder) => {
          return (
            <Layout
              style={{
                borderWidth: 1,
                borderColor: "#CDCDCD",
                margin: 10,
                padding: 5,
              }}
            >
              <Text>{reminder.reminderDate}</Text>
              <Text>{reminder.description}</Text>
            </Layout>
          );
        })}
      </SafeAreaView>
    </Layout>
  );
};

export default Reminders;
