import react, { useCallback, useEffect, useState } from 'react'

import { StyleSheet, View, Image, FlatList, Pressable } from 'react-native'
import { CameraRoll, PhotoIdentifier } from '@react-native-camera-roll/camera-roll'
import usePermission from '../../hooks/usePermission';
import { navigationProps } from '../../App';

export default function ImageView({ navigation, route }: navigationProps): JSX.Element {
    const [hasPermission] = usePermission();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>();

    const fetchPhotos = useCallback(async () => {
        const response = await CameraRoll.getPhotos({
            first: 100,
            assetType: 'All',
            include: ['imageSize'],
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
            <View style={{flexBasis: '82%', marginTop: 4}}>
                <FlatList
                    style={style.imageList}
                    numColumns={3}
                    data={photos}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item, index}) => {
                        const aspectRatio = item.node.image.width / item.node.image.height;
                        
                        return <Pressable style={style.pressableStyle} onPress={() => navigation.navigate('Image', { uri: item.node.image.uri, aspectRatio: aspectRatio })} >
                            <Image key={item.node.image.uri} source={{uri: item.node.image.uri}} style={style.image} />
                        </Pressable>
                        
                    }}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
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