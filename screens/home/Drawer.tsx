import react, { useEffect, useRef } from "react"
import { StyleSheet, View, Text, Button, Animated, Easing, Image, Pressable } from "react-native"

const burger = require('../../assets/burger.png')

type drawerProps = {
    shouldOpen: boolean,
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Drawer({ shouldOpen, setShouldOpen }: drawerProps): JSX.Element {
    const move = useRef(new Animated.Value(-200)).current;

    function open() {
        Animated.timing(move, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear
        }).start()
    }

    function close() {
        Animated.timing(move, {
            toValue: -200,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear
        }).start()
    }

    useEffect(() => {
        if(shouldOpen) {
            open()
        }
        else {
            close()
        }

    }, [shouldOpen])

    return (
        <>
                <Animated.View style={[styles.drawer, {transform: [{translateX: move}]}]}>
                    <View style={{height: 64, display: 'flex', justifyContent: 'center', marginLeft: 16}}>
                        <Pressable onPress={() => setShouldOpen(prev => !prev)}>
                            <Image source={burger} />
                        </Pressable>
                    </View>
                </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    drawer: {
        width: 200,
        height: '90%',
        backgroundColor: "white",
        position: 'absolute',
        top: 0,
    },
})