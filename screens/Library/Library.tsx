import { StyleSheet, SafeAreaView } from "react-native"
import { navigationProps } from "../../App"
import BottomAppbar from "../home/BottomAppbar"

export default function Library({ navigation, route }: navigationProps): JSX.Element {
    return (
        <>
            <SafeAreaView>
                <BottomAppbar navigation={navigation} route={route} />
            </SafeAreaView>
        </>
    )
}