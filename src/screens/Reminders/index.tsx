import { Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SessionContext, ThemeContext } from "../../context";
import NewReminder from "./components/NewReminder";
import { getReminders } from "../../api";
import moment from "moment";
import Collapsible from "react-native-collapsible";

interface Reminder {
    reminderDate: string;
    description: string;
    userId?: string;
}
//@ts-ignore
const Reminders: React.FC = ({ route }) => {
    const [reminders, setReminders] = useState<{
        previous: Reminder[];
        upcoming: Reminder[];
    }>();
    const [newReminderOpen, setNewReminderOpen] = useState<boolean>(false);
    const [
        upcomingRemindersCollapsed,
        setUpcomingRemindersCollapsed,
    ] = useState<boolean>(false);

    const [
        previousRemindersCollapsed,
        setPreviousRemindersCollapsed,
    ] = useState<boolean>(true);

    const { session } = useContext(SessionContext);
    const { theme: brightnessTheme } = useContext(ThemeContext);
    const theme = useTheme();

    const getUpcomingReminders = async () => {
        let allReminders = await getReminders(session.user._id);
        let filteredReminders = allReminders.data.reduce(
            (
                acc: { previous: Reminder[]; upcoming: Reminder[] },
                val: Reminder,
            ) => {
                // console.log(acc);
                if (moment(val.reminderDate).isBefore(moment())) {
                    acc.previous.push(val);
                } else acc.upcoming.push(val);
                return acc;
            },
            {
                upcoming: [],
                previous: [],
            },
        );
        setReminders(filteredReminders);
    };

    useEffect(() => {
        getUpcomingReminders();
    }, []);

    useEffect(() => {
        if (route?.params?.new) {
            setNewReminderOpen(true);
        }
    }, [route.params]);

    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <NewReminder
                    newReminderOpen={newReminderOpen}
                    setNewReminderOpen={setNewReminderOpen}
                />
                <Text style={{ fontSize: 23 }}>Reminders</Text>
                <TouchableOpacity
                    style={{
                        ...styles.listHeader,
                        backgroundColor:
                            brightnessTheme === "dark"
                                ? theme["color-basic-700"]
                                : theme["color-basic-200"],
                    }}
                    onPress={() =>
                        setUpcomingRemindersCollapsed(
                            !upcomingRemindersCollapsed,
                        )
                    }
                >
                    <Text>Upcoming Reminders</Text>
                </TouchableOpacity>
                <Collapsible collapsed={upcomingRemindersCollapsed}>
                    <ScrollView style={{ height: 250 }}>
                        {reminders?.previous?.map((reminder: Reminder) => {
                            return (
                                <Layout
                                    style={{
                                        // borderWidth: 1,
                                        backgroundColor:
                                            brightnessTheme === "dark"
                                                ? theme["color-basic-600"]
                                                : theme["color-basic-200"],
                                        borderColor: "#CDCDCD",
                                        margin: 10,
                                        padding: 5,
                                    }}
                                >
                                    <Text>
                                        {moment(reminder.reminderDate).format(
                                            "MM/DD/YY h:mma",
                                        )}
                                    </Text>
                                    <Text>{reminder.description}</Text>
                                </Layout>
                            );
                        })}
                    </ScrollView>
                </Collapsible>
                <TouchableOpacity
                    style={{
                        ...styles.listHeader,
                        backgroundColor:
                            brightnessTheme === "dark"
                                ? theme["color-basic-700"]
                                : theme["color-basic-200"],
                    }}
                    onPress={() =>
                        setPreviousRemindersCollapsed(
                            !previousRemindersCollapsed,
                        )
                    }
                >
                    <Text>Previous Reminders</Text>
                </TouchableOpacity>
                <Collapsible collapsed={previousRemindersCollapsed}>
                    <ScrollView style={{ height: 250 }}>
                        {reminders?.previous?.map((reminder: Reminder) => {
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
                                        {moment(reminder.reminderDate).format(
                                            "MM/DD/YY h:mma",
                                        )}
                                    </Text>
                                    <Text>{reminder.description}</Text>
                                </Layout>
                            );
                        })}
                    </ScrollView>
                </Collapsible>
            </SafeAreaView>
        </Layout>
    );
};

export default Reminders;

const styles = StyleSheet.create({
    listHeader: {
        height: 50,
        width: Dimensions.get("screen").width,
        marginLeft: -15,
        justifyContent: "center",
        padding: 15,
    },
});
