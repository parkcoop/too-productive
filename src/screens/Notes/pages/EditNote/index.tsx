import { Icon, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import PageWrapper from "../../../../common/components/PageWrapper";

interface Props {}

type Note = {
    _id: string,
    type: string,
    body: string
}

const EditNote: React.FC<Props> = ({ route, navigation }) => {
    const note: Note = route.params?.note;
    const [body, setBody] = useState<string>(
        note.body,
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
                    <Text style={{ fontSize: 25 }}>Edit note</Text>
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
            <Layout style={{
                padding: 5
            }}>
                <Text>Body/Label</Text>
                <Input
                    placeholder="Write something, expands as far as you need"
                    multiline
                    value={body}
                    onChangeText={setBody}
                    autoFocus
                    textStyle={{ minHeight: 64 }}
                />
            </Layout>
        </PageWrapper>
    );
};

export default EditNote;
