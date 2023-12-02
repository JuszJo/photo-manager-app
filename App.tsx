import React, { useState, createContext } from 'react';

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Library from './screens/Library/Library';
import Photos from './screens/home/Photos';
import ViewImage from './screens/ViewImage/ViewImage';
import ViewAlbum from './screens/Library/ViewAlbum';
import Drawer from './screens/home/Drawer';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

type drawercontextProps = {
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DrawerContext = createContext<drawercontextProps>({setShouldOpen: () => {}})

export type StackParamList = {
    Photos: undefined,
    Library: undefined,
    Image: {
        uri: string,
        aspectRatio: number,
        albumTitle?: string,
        imagePath?: string | null,
        nextImages?: PhotoIdentifier[] | undefined
    },
    Album: { title: string }
}

const Stack = createNativeStackNavigator<StackParamList>();

export type navigationProps = NativeStackScreenProps<StackParamList>

function App(): JSX.Element {
    const [shouldOpen, setShouldOpen] = useState(false)

    return (
        <>
            <DrawerContext.Provider value={{ setShouldOpen }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name='Photos' component={Photos} options={{ headerShown: false }} />
                        <Stack.Screen name='Library' component={Library} options={{ headerShown: false }} />
                        <Stack.Screen name='Image' component={ViewImage} options={{ headerTitleAlign: 'center', headerTitle: '', headerTintColor: 'white', headerStyle: {backgroundColor: 'black'} }} />
                        <Stack.Screen name='Album' component={ViewAlbum} options={{ headerTitleAlign: 'center', headerTitle: '' }} />
                    </Stack.Navigator>
                </NavigationContainer>
                <Drawer shouldOpen={shouldOpen} setShouldOpen={setShouldOpen} />
            </DrawerContext.Provider>
        </>
    );
}

export default App;