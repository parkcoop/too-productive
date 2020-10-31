import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import DatePicker from "../../../../common/components/DatePicker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import PushNotification from "react-native-push-notification";
import { saveReminder } from "../../../../api";

const NewReminder = ({ setNewReminderOpen, newReminderOpen }) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [description, setDescription] = useState();
  const [reminderDate, setReminderDate] = useState();

  const theme = useTheme();

  const postReminder = async () => {
    console.log(description, reminderDate);
    if (!reminderDate || !description) return;
    let notificationId = uuidv4();

    PushNotification.localNotificationSchedule({
      title: "HEY YOU! YOU TOLD ME TO REMIND YOU",
      id: notificationId,
      message: description,
      date: reminderDate,
      allowWhileIdle: true,
    });
    await saveReminder({ description, reminderDate, notificationId });
    setNewReminderOpen(false);
  };

  return (
    <Modal
      transparent={false}
      animationType="slide"
      visible={newReminderOpen}
      presentationStyle="formSheet"
      style={{
        ...styles.modal,
        backgroundColor: theme["background-basic-color-1"],
      }}
      onBackdropPress={() => setNewReminderOpen(false)}
      onRequestClose={() => {
        setNewReminderOpen(false);
      }}
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
            icon="clock-outline"
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
