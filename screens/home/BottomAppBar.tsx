import react from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

export default function BottomAppbar(): JSX.Element {
    
    return (
        <>
            <View style={style.bottomAppbar}>
                <Text style={style.text}>Joshua</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    bottomAppbar: {
        height: 64,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    text: {
        height: 64,
        fontSize: 20,
        color: 'black'
    },
})