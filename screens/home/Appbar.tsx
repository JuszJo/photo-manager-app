import react from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';

const burger = require('../../assets/burger.png')
const account = require('../../assets/account.png')

export default function Appbar(): JSX.Element {
    return (
        <>
            <View style={style.appbar}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 64,
                    marginHorizontal: 16
                }}>
                    <View>
                        <Image source={burger} />
                    </View>
                    <View>
                        <Text style={style.appbarText}>Photos</Text>
                    </View>
                    <View>
                        <Image source={account } />
                    </View>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    appbar: {
        height: 64,
        backgroundColor: 'white',
        // position: 'absolute'
    },
    appbarText: {
        textAlign: 'center',
        color: "#444444",
        fontSize: 22,
        fontFamily: 'Gadugi',
    }
})

// add more things