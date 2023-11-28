import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image } from "react-native"
import { StackParamList } from "../../App"

export default function ViewImage({ navigation, route }: NativeStackScreenProps<StackParamList, 'Image'>): JSX.Element {
    const { uri, aspectRatio } = route.params

    return (
        <>
            <SafeAreaView style={{backgroundColor: 'black'}}>
                <View style={{display: 'flex', height: '100%', justifyContent: 'space-around'}}>
                    <Image style={{ aspectRatio: aspectRatio }} source={{ uri: uri }} />
                </View>
            </SafeAreaView>
        </>
    )
}