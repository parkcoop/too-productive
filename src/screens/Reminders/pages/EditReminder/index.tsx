import { NavigationState } from "@react-navigation/native";
import { Icon, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { NavigationParams, NavigationScreenProp } from "react-navigation";
import PageWrapper from "../../../../common/components/PageWrapper";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface Reminder {
    reminderDate: string;
    description: string;
    userId?: string;
    _id: string;
}

const EditReminder: React.FC<Props> = ({ route, navigation }) => {
    const reminder: Reminder = route.params?.reminder;
    const [description, setDescription] = useState<string>(
        reminder.description,
    );
    const theme = useTheme();
    return (
        <PageWrapper>
            <Layout
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // marginBottom: 15,
                    // paddingTop: 15,
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
                {/* <TouchableOpacity> */}
                <Layout
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    <Text style={{ fontSize: 25 }}>Edit Reminder</Text>
                </Layout>
                {/* </TouchableOpacity> */}
                <Icon
                    style={{
                        width: 25,
                        height: 25,
                    }}
                    fill={theme["color-primary-400"]}
                    name="trash-2-outline"
                />
            </Layout>
            <Layout>
                <Text>Description/Label</Text>
                <Input value={description} onChangeText={setDescription} />
                <Text>Date</Text>
                <Input value={description} onChangeText={setDescription} />
            </Layout>
        </PageWrapper>
    );
};

export default EditReminder;
