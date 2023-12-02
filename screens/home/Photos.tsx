import {
    Image,
    SafeAreaView,
    StyleSheet,
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

    function touchStart() {
        if(shouldOpen == true) {
            setShouldOpen(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
                <View style={[{opacity: shouldOpen ? 0.5 : 1}, style.mainView]} onTouchStart={touchStart} >
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

const style = StyleSheet.create({
    mainView: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }   
})