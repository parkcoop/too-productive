import React, { useContext, useState } from "react";
import { Avatar, Button, Divider, Layout, Text } from "@ui-kitten/components";
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from "react-navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../../context";
import { TouchableOpacity } from "react-native";
import ModalMenu from "../../common/components/ModalMenu";
import Settings from "../Settings";
interface DashboardProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
    const { session } = useContext(SessionContext);
    const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

    return (
        <Layout style={{ flex: 1, padding: 15 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Layout
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Layout>
                        <Text style={{ fontSize: 25 }}>Welcome</Text>
                        <Text style={{ fontSize: 35 }}>
                            {session?.user?.username}
                        </Text>
                    </Layout>
                    <TouchableOpacity onPress={() => setSettingsVisible(true)}>
                        <Avatar
                            style={{ height: 40, width: 40 }}
                            source={{
                                uri: session?.user?.avatar,
                            }}
                        ></Avatar>
                    </TouchableOpacity>
                </Layout>
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
                    <Text style={{ marginTop: 15, marginBottom: 15 }}>
                        Quick Actions
                    </Text>
                    <Button onPress={() => navigation.navigate("Notes")}>
                        TAKE NOTES
                    </Button>
                    <Text style={{ marginTop: 15, marginBottom: 15 }}>
                        Recent Notes
                    </Text>
                    <Text style={{ marginTop: 15, marginBottom: 15 }}>
                        Upcoming Reminders
                    </Text>
                </Layout>
                <ModalMenu
                    visible={settingsVisible}
                    setVisible={setSettingsVisible}
                >
                    <Settings />
                </ModalMenu>
            </SafeAreaView>
        </Layout>
    );
};

export default Dashboard;
