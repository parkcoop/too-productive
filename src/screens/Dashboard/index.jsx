import React from 'react'
// import { Text, View } from 'react-native'
import * as eva from '@eva-design/eva';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { ApplicationProvider, Button, Divider, Layout, Text, TopNavigation, IconRegistry } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';


const Dashboard = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => navigaton.navigate('notes')}>TAKE NOTES</Button>
      </Layout>
    </SafeAreaView>
);

export default Dashboard