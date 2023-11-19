import react from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

const photos = require('../../assets/photos.png')
const library = require('../../assets/library.png')

export default function BottomAppbar(): JSX.Element {
    
    return (
        <>
            <View style={style.bottomAppbar}>
                <View style={style.viewContainer}>
                    <Image source={photos} />
                    <Text style={style.text}>Photos</Text>
                </View>
                <View style={style.viewContainer}>
                    <Image source={library} />
                    <Text style={style.text}>Library</Text>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    bottomAppbar: {
        height: 64,
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 64,
    },
    viewContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#444444',
    },
})