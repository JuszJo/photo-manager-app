import {
    Image,
    SafeAreaView,
    Text,
    View,
} from 'react-native';

import Appbar from './Appbar';
import ImageView from './ImageView';
import BottomAppbar from './BottomAppbar';
import Drawer from './Drawer';
import { useState } from 'react';
import { navigationProps } from '../../App';

export default function Photos({ navigation, route }: navigationProps): JSX.Element {
    const [shouldOpen, setShouldOpen] = useState(false)

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
                <Drawer shouldOpen={shouldOpen} setShouldOpen={setShouldOpen} />
            </SafeAreaView>
        </>
    )
}