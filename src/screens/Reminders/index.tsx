import {
  Button,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { SessionContext } from "../../context";
import NewReminder from "./components/NewReminder";
import { getReminders } from "../../api";
import moment from "moment";

interface Reminder {
  reminderDate: string,
  description: string,
  userId?: string
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Array<Reminder>>([]);
  const [newReminderOpen, setNewReminderOpen] = useState<boolean>(false);
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
        <Text>Upcoming Reminders</Text>
        <ScrollView>
          {reminders?.map((reminder: Reminder) => {
            return (
              <Layout
                style={{
                  borderWidth: 1,
                  borderColor: "#CDCDCD",
                  margin: 10,
                  padding: 5,
                }}
              >
                <Text>
                  {moment(reminder.reminderDate).format("MM/DD/YY h:mma")}
                </Text>
                <Text>{reminder.description}</Text>
              </Layout>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Reminders;
