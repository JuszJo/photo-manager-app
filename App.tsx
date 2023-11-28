import React, { useState, useContext, createContext } from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    View,
} from 'react-native';

// import Appbar from './screens/home/Appbar';
// import ImageView from './screens/home/ImageView';
// import BottomAppbar from './screens/home/BottomAppbar';
// import Drawer from './screens/home/Drawer';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Library from './screens/Library/Library';
import Photos from './screens/home/Photos';

type drawercontextProps = {
    shouldOpen: boolean,
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DrawerContext = createContext<drawercontextProps>({shouldOpen: false, setShouldOpen: () => {}})

export type navigationProps = NativeStackScreenProps<StackParamList>

function ViewImage({ navigation, route }: NativeStackScreenProps<StackParamList, 'Image'>): JSX.Element {
    const { uri, aspectRatio } = route.params    

    return (
        <>
            <SafeAreaView>
                <View style={{display: 'flex', height: '100%', justifyContent: 'space-around'}}>
                    <Image style={{ aspectRatio: aspectRatio }} source={{ uri: uri }} />
                </View>
            </SafeAreaView>
        </>
    )
}

export type StackParamList = {
    Photos: undefined,
    Library: undefined,
    Image: { uri: string, aspectRatio?: number }
}

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
    const [shouldOpen, setShouldOpen] = useState(false)

    return (
        <>
            <DrawerContext.Provider value={{shouldOpen, setShouldOpen}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name='Photos' component={Photos} options={{ headerShown: false }} />
                        <Stack.Screen name='Library' component={Library} options={{ headerShown: false }} />
                        <Stack.Screen name='Image' component={ViewImage} options={{ headerTitleAlign: 'center', headerTitle: '' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </DrawerContext.Provider>
        </>
    );
}

export default App;