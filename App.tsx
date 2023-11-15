import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Appbar from './screens/home/Appbar';
import ImageView from './screens/home/ImageView';
import BottomAppbar from './screens/home/BottomAppbar';


function App(): JSX.Element {

  return (
    <SafeAreaView>
        <View style={{
            display: 'flex',
            backgroundColor: 'blue',
            height: '100%'
        }}>
            <Appbar />
            <ImageView />
            {/* <BottomAppbar /> */}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
