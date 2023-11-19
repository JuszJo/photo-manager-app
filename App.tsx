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
    <>
        <SafeAreaView style={{backgroundColor: '#F1F1F1'}}>
            <View style={{height: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <View style={{display: 'flex'}}>
                    <Appbar />
                    <ImageView />    
                </View>
                <View>
                    <BottomAppbar />
                </View>
            </View>
        </SafeAreaView>
    </>
  );
}

export default App;