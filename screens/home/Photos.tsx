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
    const { setShouldOpen } = useContext(DrawerContext)

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
                <View style={{ height: '100%', display: 'flex', justifyContent: 'space-between' }}>
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