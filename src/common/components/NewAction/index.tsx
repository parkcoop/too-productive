import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from "react-navigation";
interface NewActionProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const NewAction: React.FC<NewActionProps> = ({ navigation }) => {
    const [panelVisible, setPanelVisible] = useState(false);
    const theme = useTheme();
    return (
        <>
            <Button
                onPress={() => {
                    setPanelVisible(true);
                }}
                style={styles.buttonStyle}
            >
                +
            </Button>
            <Layout>
                <Modal
                    transparent
                    backdropOpacity={0.3}
                    isVisible={panelVisible}
                    onBackdropPress={() => setPanelVisible(false)}
                    style={styles.contentView}
                >
                    <Layout style={styles.content}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Habits", { new: true });
                            }}
                        >
                            <Layout style={{ alignItems: "center" }}>
                                <Icon
                                    style={{
                                        width: 50,
                                        height: 50,
                                        margin: 10,
                                    }}
                                    fill={theme["text-basic-color"]}
                                    name="repeat-outline"
                                />
                                <Text>Habit</Text>
                            </Layout>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Reminders", { new: true });
                            }}
                        >
                            <Layout style={{ alignItems: "center" }}>
                                <Icon
                                    style={{
                                        width: 50,
                                        height: 50,
                                        margin: 10,
                                    }}
                                    fill={theme["text-basic-color"]}
                                    name="bulb-outline"
                                />
                                <Text>Reminder</Text>
                            </Layout>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Notes", { new: true });
                            }}
                        >
                            <Layout style={{ alignItems: "center" }}>
                                <Icon
                                    style={{
                                        width: 50,
                                        height: 50,
                                        margin: 10,
                                    }}
                                    fill={theme["text-basic-color"]}
                                    name="file-text-outline"
                                />
                                <Text>Note</Text>
                            </Layout>
                        </TouchableOpacity>
                    </Layout>
                </Modal>
            </Layout>
            {/* <ModalMenu visible={dialogVisible} setVisible={setDialogVisible}>
                {(() => {
                default
                    switch (newItem) {
                        case "note":
                            return <NoteToSelf />;
                    }
                })()}
            </ModalMenu> */}
        </>
    );
};

export default NewAction;

const styles = StyleSheet.create({
    content: {
        padding: 25,
        // paddingBottom: 40,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    contentView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    buttonStyle: {
        fontSize: 23,
        height: 90,
        width: 90,
        // padding: 5,
        borderRadius: 50,
    },
});
