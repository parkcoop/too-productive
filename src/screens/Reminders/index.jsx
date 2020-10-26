import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native";

const Reminders = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Get reminded</Text>
      </SafeAreaView>
    </Layout>
  );
};

export default Reminders;
