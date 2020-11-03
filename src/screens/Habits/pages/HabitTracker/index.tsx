import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import CalendarGrid from "../../components/CalendarGrid";
import Modal from "react-native-modal";

interface Props {
    habit: Habit;
}

interface Habit {
    label: string;
    color: string;
    trackedDays: string[];
    startDate: string;
}

const HabitTracker: React.FC<Props> = ({ navigation, route }) => {
    const theme = useTheme();
    const habit: Habit = route.params?.habit;
    return (
        <Layout style={{ padding: 25, flex: 1 }}>
            <SafeAreaView>
                <Layout
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            style={{
                                width: 35,
                                height: 35,
                                // marginLeft: 10,
                            }}
                            fill={theme["color-primary-400"]}
                            name="arrow-ios-back-outline"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Layout
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Text style={{ fontSize: 25 }}>{habit.label}</Text>
                            <Icon
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                }}
                                fill={theme["color-primary-400"]}
                                name="edit-outline"
                            />
                        </Layout>
                    </TouchableOpacity>
                    <Icon
                        style={{
                            width: 25,
                            height: 25,
                        }}
                        fill={theme["color-primary-400"]}
                        name="trash-2-outline"
                    />
                </Layout>
                <ScrollView horizontal>
                    <CalendarGrid habit={habit} />
                </ScrollView>
                <Layout style={{ marginBottom: 25, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, marginBottom: 10 }}>
                        Today's Status
                    </Text>
                    <Layout
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button
                            accessoryLeft={() => (
                                <Icon
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginLeft: 10,
                                    }}
                                    fill={theme["color-primary-200"]}
                                    name="checkmark-circle-2-outline"
                                />
                            )}
                            style={{ width: "35%" }}
                            status="success"
                        >
                            Success
                        </Button>
                        <Button
                            accessoryLeft={() => (
                                <Icon
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginLeft: 10,
                                    }}
                                    fill={theme["color-primary-200"]}
                                    name="close-circle-outline"
                                />
                            )}
                            style={{ width: "35%" }}
                            status="danger"
                        >
                            Failure
                        </Button>
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 25, marginTop: 10 }}>
                    <Text style={{ fontSize: 22, marginBottom: 10 }}>
                        Share
                    </Text>
                    <Button>Share</Button>
                </Layout>
            </SafeAreaView>
        </Layout>
    );
};

export default HabitTracker;
