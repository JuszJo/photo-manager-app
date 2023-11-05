import react from 'react'
import { StyleSheet, View, Text } from 'react-native';

export default function Appbar(): JSX.Element {
    return (
        <>
            <View style={style.appbar}>
                <Text style={style.appbarText}>Appbar</Text>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    appbar: {
        height: 40,
        backgroundColor: 'blue',
    },
    appbarText: {
        textAlign: 'center',
        color: "white"
    }
})