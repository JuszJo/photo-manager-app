import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Image, FlatList, useWindowDimensions } from "react-native"
import { StackParamList, swipableProps } from "../../App"

function SwipableImages({ nextImages, initialIndex }: swipableProps): JSX.Element {
    const screenDimensions = {
        width: useWindowDimensions().width,
        height: useWindowDimensions().height
    }

    return (
        <>
            <View style={{ height: '100%' }}>
                <FlatList
                    data={nextImages}
                    keyExtractor={(_, index) => index.toString()}
                    getItemLayout={(data, index) => {
                        return {
                            length: screenDimensions.width,
                            offset: screenDimensions.width * index,
                            index: index
                        }
                    }}
                    initialScrollIndex={initialIndex}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={screenDimensions.width}
                    snapToAlignment="start"
                    decelerationRate={"fast"}
                    horizontal
                    renderItem={({ item, index }) => {
                        const aspectRatio = item.node.image.width / item.node.image.height;

                        return (
                            <>
                                <View style={{ display: 'flex', width: screenDimensions.width, justifyContent: 'center' }}>
                                    <Image style={{ aspectRatio: aspectRatio }} source={{ uri: item.node.image.uri }} />
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

    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'black' }}>
                <SwipableImages {...route.params} />
            </SafeAreaView>
        </>
    )
}