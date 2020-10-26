import React from 'react';
import {
  ApplicationProvider,
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
  IconRegistry,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import RichTextEditor from '../../common/components/RichTextEditor';

const Dashboard = ({navigation}) => (
  <SafeAreaView style={{flex: 1}}>
    <TopNavigation title="Welcome to Native Notes" alignment="flex-start" />
    <Divider />
    <RichTextEditor style={{height: 50}} />
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigaton.navigate('notes')}>TAKE NOTES</Button>
    </Layout>
  </SafeAreaView>
);

export default Dashboard;
