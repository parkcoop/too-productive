import { Icon, Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import "react-native-get-random-values";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMenu: React.FC<Props> = ({ children, visible, setVisible }) => {
    const theme = useTheme();
    return (
        <Modal
            transparent={true}
            isVisible={visible}
            presentationStyle="overFullScreen"
            style={{
                ...styles.modal,
                marginTop: 50,
                borderRadius: 25,
                backgroundColor: theme["background-basic-color-1"],
            }}
            onBackdropPress={() => setVisible(false)}
        >
            <Layout style={{ display: "flex", flexDirection: "column" }}>
                <Icon
                    style={styles.icon}
                    fill={theme["text-basic-color"]}
                    name="arrow-ios-back-outline"
                    onPress={() => setVisible(false)}
                />
            </Layout>
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </Modal>
    );
};

export default ModalMenu;

const styles = StyleSheet.create({
    modal: {
        padding: 15,
        margin: 0,
    },
    icon: {
        // position: "absolute",
        top: 0,
        left: -5,
        width: 35,
        height: 35,
        marginBottom: 15,
    },
});
