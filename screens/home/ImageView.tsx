import react, { useCallback, useEffect, useState } from 'react'

import { SafeAreaView, StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll'
import usePermission from '../../hooks/usePermission';

export default function ImageView(): JSX.Element {
    const [hasPermission] = usePermission();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>();

    const fetchPhotos = useCallback(async () => {
        const response = await CameraRoll.getPhotos({
            first: 100,
            assetType: 'All'
        })

        setPhotos(response.edges)
    }, [])

    useEffect(() => {
        if(hasPermission) {
            fetchPhotos()
        }
    }, [hasPermission])

    return (
        <>
            <View style={{flexBasis: '83%'}}>
                <FlatList
                    style={style.imageList}
                    numColumns={3}
                    data={photos}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => {
                        return <Image key={item.node.image.uri} height={140} source={{uri: item.node.image.uri}} style={style.image} />
                    }}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    imageList: {
    },
    image: {
        height: 120,
        width: '33%',
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4
    }
})