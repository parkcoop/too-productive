import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Reminders = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1}}>
        <Text>Get reminded</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Reminders;
