import { PhotoIdentifier, CameraRoll } from "@react-native-camera-roll/camera-roll";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { DrawerContext, StackParamList } from "../../App";
import usePermission from "../../hooks/usePermission";
import Appbar from "../home/Appbar";
import BottomAppbar from "../home/BottomAppbar";

export default function ViewAlbum({ navigation, route }: NativeStackScreenProps<StackParamList, 'Album'>): JSX.Element {
    const [hasPermission] = usePermission();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>();
    const { title } = route.params

    
    const fetchPhotos = useCallback(async () => {
        const response = await CameraRoll.getPhotos({
            first: 100,
            assetType: 'All',
            groupName: title,
            include: ['imageSize']
        })

        setPhotos(response.edges)
        
        navigation.setOptions({ headerTitle: title })
    }, [])

    useEffect(() => {
        if(hasPermission) {
            fetchPhotos()
        }
    }, [hasPermission])

    return (
        <>
            <SafeAreaView style={style.mainView}>
                <View style={{flexBasis: '90%', marginTop: 4}}>
                    <FlatList
                        style={style.imageList}
                        numColumns={3}
                        data={photos}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item, index}) => {
                            const aspectRatio = item.node.image.width / item.node.image.height;
                            const imagePath = item.node.image.filepath

                            return <Pressable style={style.pressableStyle} onPress={() => navigation.navigate('Image', { uri: item.node.image.uri, aspectRatio: aspectRatio, imagePath: imagePath })} >
                                <Image key={item.node.image.uri} source={{uri: item.node.image.uri}} style={style.image} />
                            </Pressable>
                        }}
                    />
                </View>
                <BottomAppbar navigation={navigation} route={route} />
            </SafeAreaView>
        </>
    )
}

const style = StyleSheet.create({
    mainView: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: 'rgb(245, 245, 245)',
    },
    imageList: {
    },
    pressableStyle: {
        height: 120,
        width: '33%',
    },
    image: {
        height: '100%',
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4
    }
})