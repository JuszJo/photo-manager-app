import react, { useEffect, useRef } from "react"
import { StyleSheet, View, Text, Button, Animated, Easing } from "react-native"

type drawerProps = {
    shouldOpen: boolean
}

export default function Drawer({ shouldOpen }: drawerProps): JSX.Element {
    const move = useRef(new Animated.Value(-200)).current;

    function animation() {
        Animated.timing(move, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear
        }).start()
    }

    useEffect(() => {
        if(shouldOpen) {
            animation()
        }
        else {

        }

    }, [shouldOpen])

    return (
        <>
            <View>
                <Animated.View style={[styles.drawer, {transform: [{translateX: move}]}]}  />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    drawer: {
        width: 200,
        height: 200,
        backgroundColor: "red",
        position: 'absolute',
        top: 0,
    },
    // moveAnimation: {
    //     transform: [{
    //         translateX: move
    //     }]
    // }
})