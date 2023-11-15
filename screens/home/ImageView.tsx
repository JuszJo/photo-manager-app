import react, { useCallback, useEffect, useState } from 'react'

import { StyleSheet, View, Text, Image } from 'react-native'
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

        console.log(response);

        setPhotos(response.edges)
    }, [])

    useEffect(() => {
        console.log("dunno", hasPermission);
        if(hasPermission) {
            console.log("there is permission");
            fetchPhotos()
        }
    }, [hasPermission])

    return (
        <>
            <View>
                {photos?.map(item => {
                    return <Text key={item.node.image.uri}>{item.node.image.uri}</Text>
                })}
            </View>
        </>
    )
}