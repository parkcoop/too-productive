import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text } from "@ui-kitten/components";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import CalendarGrid from "./components/CalendarGrid";
import habits from "./components/CalendarGrid/data";
import NewHabit from "./components/NewHabit";
import ModalMenu from "../../common/components/ModalMenu";
import { SessionContext } from "../../context";
import { getHabits, saveHabit } from "../../api/Habits";
import { CommonActions } from "@react-navigation/native";

interface Habit {
    label: string;
    color: string;
    trackedDays: string[];
    startDate: string;
}

const Habits = ({ route, navigation }) => {
    const [userHabits, setUserHabits] = useState<Habit[]>([]);
    const [newHabitVisible, setNewHabitVisible] = useState<boolean>(false);
    const [newHabitMenuVisible, setNewHabitMenuVisible] = React.useState<
        boolean
    >(false);
    const { session } = useContext(SessionContext);

    const getUserReminders = async () => {
        let userHabits = await getHabits(session.user._id);
        setUserHabits(userHabits.data);
    };
    const saveUserHabit = async ({ color, label }) => {
        console.log("saving");
        await saveHabit({ color, label, userId: session.user._id });
        setNewHabitMenuVisible(false);
        navigation.navigate("Habits", { new: false });
    };

    useEffect(() => {
        if (route.params?.new) {
            setNewHabitMenuVisible(true);
        }
        getUserReminders();
    }, [route.params]);

    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={{ fontSize: 23 }}>Habit Tracking</Text>
                    <Layout style={{ width: "100%", height: 87.5 }}>
                        {habits &&
                            habits.map((habit, i) => {
                                return (
                                    <Layout
                                        key={i}
                                        style={{
                                            backgroundColor:
                                                "rgba(255,255,255,0.1)",
                                            padding: 5,
                                            margin: 10,
                                            height: 175,
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Text
                                            style={{ fontSize: 18, margin: 10 }}
                                        >
                                            {habit.label}
                                        </Text>
                                        <ScrollView
                                            horizontal
                                            contentContainerStyle={{
                                                flexGrow: 1,
                                                paddingRight: 25,
                                            }}
                                        >
                                            <CalendarGrid habit={habit} />
                                        </ScrollView>
                                    </Layout>
                                );
                            })}
                    </Layout>
                </ScrollView>
                <ModalMenu
                    visible={newHabitMenuVisible}
                    setVisible={setNewHabitMenuVisible}
                >
                    <NewHabit saveUserHabit={saveUserHabit} />
                </ModalMenu>
            </SafeAreaView>
        </Layout>
    );
};

export default Habits;

const styles = StyleSheet.create({
    cell: {
        width: 10,
        height: 10,
        margin: 2.5,
        // paddingTop: 1,
        borderWidth: 0,
        fontSize: 7.5,
        textAlign: "center",
    },
});
