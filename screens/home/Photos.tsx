import {
    Image,
    SafeAreaView,
    Text,
    View,
} from 'react-native';

import Appbar from './Appbar';
import ImageView from './ImageView';
import BottomAppbar from './BottomAppbar';
import { useState, useContext } from 'react';
import { DrawerContext, navigationProps } from '../../App';

export default function Photos({ navigation, route }: navigationProps): JSX.Element {
    const { shouldOpen, setShouldOpen } = useContext(DrawerContext)

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
                <View style={{ opacity: shouldOpen ? 0.5 : 1 , height: '100%', display: 'flex', justifyContent: 'space-between' }} onTouchStart={() => {
                    if(shouldOpen == true) {
                        setShouldOpen(false)
                    }
                }} >
                    <View style={{ display: 'flex' }}>
                        <Appbar setShouldOpen={setShouldOpen} />
                        <ImageView navigation={navigation} route={route} />
                    </View>
                    <View>
                        <BottomAppbar navigation={navigation} route={route} />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}