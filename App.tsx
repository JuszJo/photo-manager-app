import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
} from 'react-native';

import Appbar from './screens/home/Appbar';
import ImageView from './screens/home/ImageView';
import BottomAppbar from './screens/home/BottomAppbar';
import Drawer from './screens/home/Drawer';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type navigationProps = NativeStackScreenProps<StackParamList>

function Photos({ navigation, route }: navigationProps): JSX.Element {
    const [shouldOpen, setShouldOpen] = useState(false)

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
                <View style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex' }}>
                        <Appbar setShouldOpen={setShouldOpen} />
                        <ImageView />
                    </View>
                    <View>
                        <BottomAppbar navigation={navigation} route={route} />
                    </View>
                </View>
                <Drawer shouldOpen={shouldOpen} setShouldOpen={setShouldOpen} />
            </SafeAreaView>
        </>
    )
}

function Library({ navigation, route }: navigationProps): JSX.Element {
    return (
        <>
            <SafeAreaView>
                <BottomAppbar navigation={navigation} route={route} />
            </SafeAreaView>
        </>
    )
}

export type StackParamList = {
    Photos: undefined,
    Library: undefined,
}

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Photos' component={Photos} options={{ headerShown: false }} />
                    <Stack.Screen name='Library' component={Library} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default App;