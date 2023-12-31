import react, { useRef } from 'react'
import { StyleSheet, View, Text, Image, Pressable, Animated, Easing } from 'react-native';

const burger = require('../../assets/burger.png')
const account = require('../../assets/account.png')

type appbarProps = {
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Appbar({ setShouldOpen }: appbarProps): JSX.Element {

    return (
        <>
            <View style={style.appbar}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 64,
                    // marginHorizontal: 16
                }}>
                    <Pressable style={{paddingHorizontal: 16, paddingVertical: 8}} onPress={() => setShouldOpen(prev => !prev)}>
                        <View>
                            <Image source={burger} />
                        </View>
                    </Pressable>
                    <View>
                        <Text style={style.appbarText}>Photos</Text>
                    </View>
                    <View style={{paddingHorizontal: 16}}>
                        <Image source={account} />
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
        elevation: 4,
        shadowColor: 'black',
    },
    appbarText: {
        textAlign: 'center',
        color: "#444444",
        fontSize: 22,
        fontFamily: 'Gadugi',
    },
})