import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image, FlatList, useWindowDimensions } from "react-native"
import { StackParamList } from "../../App"
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll"

type swipableProps = {
    uri: string;
    aspectRatio: number;
    albumTitle?: string | undefined;
    imagePath?: string | null | undefined;
    nextImages?: PhotoIdentifier[] | undefined;
}

function SwipableImages({ nextImages }: swipableProps): JSX.Element {
    const screenDimensions = {
        width: useWindowDimensions().width,
        height: useWindowDimensions().height
    }

    return (
        <>
            <View style={{backgroundColor: 'red', height: '100%'}}>
                <FlatList
                    data={nextImages}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={screenDimensions.width}
                    snapToAlignment="start"
                    decelerationRate={"fast"}
                    horizontal
                    renderItem={({item, index}) => {
                        const aspectRatio = item.node.image.width / item.node.image.height;

                        return (
                            <>
                                <View style={{display: 'flex', width: screenDimensions.width, justifyContent: 'center'}}>
                                    <Image style={{aspectRatio: aspectRatio, }} source={{ uri: item.node.image.uri }} />
                                </View>
                            </>
                        )
                    }}
                />
            </View>
        </>
    )
}

export default function ViewImage({ navigation, route }: NativeStackScreenProps<StackParamList, 'Image'>): JSX.Element {
    const { uri, aspectRatio, nextImages } = route.params

    return (
        <>
            <SafeAreaView style={{backgroundColor: 'black'}}>
                <SwipableImages {...route.params} />
                {/* <View style={{display: 'flex', height: '100%', justifyContent: 'center', backgroundColor: 'red'}}>
                    <Image style={{ aspectRatio: aspectRatio }} source={{ uri: uri }} />
                </View> */}
            </SafeAreaView>
        </>
    )
}