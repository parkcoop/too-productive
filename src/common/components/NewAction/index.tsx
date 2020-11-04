import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Vibration } from "react-native";
import Modal from "react-native-modal";
import { ThemeContext } from "../../../context";
import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
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
    const { theme: brightnessTheme } = useContext(ThemeContext);
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    // Vibration.vibrate([1, 2, 3], false);
                    setPanelVisible(true);
                }}
            >
                <Layout
                    style={{
                        ...styles.buttonStyle,
                        borderWidth: 2.5,
                        borderColor: theme["color-basic-transparent-100"],
                        backgroundColor: theme["color-primary-100"],
                        // shadowColor: "#000",
                        // shadowOffset: {
                        //     width: 0,
                        //     height: 3,
                        // },
                        // shadowOpacity: 0.53,
                        // shadowRadius: 4.97,

                        // elevation: 5,
                    }}
                >
                    <Icon
                        style={{
                            width: 35,
                            height: 35,
                            margin: 10,
                        }}
                        fill={theme["color-primary-500"]}
                        name="plus-outline"
                    />
                </Layout>
            </TouchableOpacity>
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
                                <Layout
                                    style={{
                                        backgroundColor:
                                            theme[
                                                "color-basic-transparent-100"
                                            ],
                                        borderRadius: 50,
                                        padding: 5,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Icon
                                        style={{
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                        }}
                                        fill={theme["color-primary-400"]}
                                        name="repeat-outline"
                                    />
                                </Layout>
                                <Text>Habit</Text>
                            </Layout>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Reminders", { new: true });
                            }}
                        >
                            <Layout style={{ alignItems: "center" }}>
                                <Layout
                                    style={{
                                        backgroundColor:
                                            theme[
                                                "color-basic-transparent-100"
                                            ],
                                        borderRadius: 50,
                                        padding: 5,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Icon
                                        style={{
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                        }}
                                        fill={theme["color-primary-400"]}
                                        name="bulb-outline"
                                    />
                                </Layout>
                                <Text>Reminder</Text>
                            </Layout>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Notes", { new: true });
                            }}
                        >
                            <Layout style={{ alignItems: "center" }}>
                                <Layout
                                    style={{
                                        backgroundColor:
                                            theme[
                                                "color-basic-transparent-100"
                                            ],
                                        borderRadius: 50,
                                        padding: 5,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Icon
                                        style={{
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                        }}
                                        fill={theme["color-primary-400"]}
                                        name="file-text-outline"
                                    />
                                </Layout>
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
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
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
        height: 75,
        width: 75,
        // backgroundColor: '#CDCDCD',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // padding: 5,
        borderRadius: 50,
        marginBottom: 50,
    },
});
