import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import DatePicker from "../../../../common/components/DatePicker";
import "react-native-get-random-values";
import PushNotification from "react-native-push-notification";
import { saveReminder } from "../../../../api";
import { SessionContext } from "../../../../context";

interface NewReminderProps {
  setNewReminderOpen: React.Dispatch<React.SetStateAction<boolean>>,
  newReminderOpen: boolean
}

const NewReminder: React.FC<NewReminderProps> = ({ setNewReminderOpen, newReminderOpen }) => {
  const [description, setDescription] = useState<string>('');
  const { session } = useContext(SessionContext);
  const [reminderDate, setReminderDate] = useState<Date>(
    new Date(Date.now() + 5 * 1000)
  );

  const theme = useTheme();

  const postReminder = async () => {
    console.log(description, reminderDate);
    if (!reminderDate || !description) return;
    let notificationId = Math.ceil(Math.random()*Date.now());

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
    <Modal
      transparent={false}
      isVisible={newReminderOpen}
      presentationStyle="formSheet"
      style={{
        ...styles.modal,
        backgroundColor: theme["background-basic-color-1"],
      }}
      onBackdropPress={() => setNewReminderOpen(false)}
    >
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Icon
          style={styles.icon}
          fill={theme["text-basic-color"]}
          name="arrow-ios-back-outline"
          onPress={() => setNewReminderOpen(false)}
        />
        <Text>OMG</Text>
      </Layout>
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
            style={{ width: "50%", alignSelf: "center", margin: 15 }}
          >
            SAVE
          </Button>
        </Layout>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NewReminder;

const styles = StyleSheet.create({
  modal: {
    padding: 15,
    margin: 0,
  },
  formElement: {
    marginTop: 15,
  },
  label: {
    marginBottom: 15,
    fontSize: 18,
  },
  form: {},
  icon: {
    // position: "absolute",
    top: 0,
    left: -5,
    width: 35,
    height: 35,
    marginBottom: 15,
  },
});
