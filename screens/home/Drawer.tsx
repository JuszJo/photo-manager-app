import react, { useEffect, useRef } from "react"
import { StyleSheet, View, Text, Button, Animated, Easing, Image, Pressable } from "react-native"

const burger = require('../../assets/burger.png')
const cancel = require('../../assets/close.png')

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
                    <View style={styles.drawerTab}>
                        <Pressable onPress={() => setShouldOpen(prev => !prev)} style={{paddingHorizontal: 16, paddingVertical: 8}} >
                            <Image source={cancel} />
                        </Pressable>
                    </View>
                    <View>
                        <Text style={styles.drawerText}>More Features Coming Soon</Text>
                    </View>
                </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    drawer: {
        width: 200,
        height: '100%',
        backgroundColor: "white",
        position: 'absolute',
        top: 0,
    },
    drawerTab: {
        height: 64,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    drawerText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80
    }
})