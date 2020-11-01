import { Button, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import DatePicker from "../../../../common/components/DatePicker";
import "react-native-get-random-values";
import PushNotification from "react-native-push-notification";
import { saveReminder } from "../../../../api";
import { SessionContext } from "../../../../context";
import ModalMenu from "../../../../common/components/ModalMenu";

interface NewReminderProps {
    setNewReminderOpen: React.Dispatch<React.SetStateAction<boolean>>;
    newReminderOpen: boolean;
}

const NewReminder: React.FC<NewReminderProps> = ({
    setNewReminderOpen,
    newReminderOpen,
}) => {
    const [description, setDescription] = useState<string>("");
    const { session } = useContext(SessionContext);
    const [reminderDate, setReminderDate] = useState<Date>(
        new Date(Date.now() + 5 * 1000),
    );

    const postReminder = async () => {
        console.log(description, reminderDate);
        if (!reminderDate || !description) return;
        let notificationId = Math.ceil(Math.random() * Date.now());

        PushNotification.localNotificationSchedule({
            title: "New reminder",
            id: notificationId,
            message: description,
            date: reminderDate,
            allowWhileIdle: true,
        });
        await saveReminder({
            description,
            reminderDate,
            notificationId,
            userId: session.user._id,
        });
        setNewReminderOpen(false);
    };

    return (
        <ModalMenu setVisible={setNewReminderOpen} visible={newReminderOpen}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
            >
                <Layout style={styles.form}>
                    <Text style={{ fontSize: 25 }}>New reminder</Text>
                    <Layout style={styles.formElement}>
                        <Text style={styles.label}>Description</Text>
                        <Input
                            value={description}
                            onChangeText={(e) => setDescription(e)}
                        />
                    </Layout>
                    <Layout style={styles.formElement}>
                        <Text style={styles.label}>Date</Text>
                        <DatePicker
                            setFieldValue={setReminderDate}
                            fieldValue={reminderDate}
                        />
                    </Layout>
                    <Button
                        onPress={postReminder}
                        style={{
                            width: "50%",
                            alignSelf: "center",
                            margin: 15,
                        }}
                    >
                        SAVE
                    </Button>
                </Layout>
            </KeyboardAvoidingView>
        </ModalMenu>
    );
};

export default NewReminder;

const styles = StyleSheet.create({
    formElement: {
        marginTop: 15,
    },
    label: {
        marginBottom: 15,
        fontSize: 18,
    },
    form: {},
});
