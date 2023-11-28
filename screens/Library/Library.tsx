import { useCallback, useEffect } from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, Image } from "react-native"
import { navigationProps } from "../../App"
import BottomAppbar from "../home/BottomAppbar"
import usePermission from "../../hooks/usePermission";
import { CameraRoll, PhotoIdentifier, Album, PhotoIdentifiersPage } from "@react-native-camera-roll/camera-roll";
import { useState } from "react";

type folderviewProps = {
    title: string,
    imageURI: string
}

function FolderView({ title, imageURI }: folderviewProps): JSX.Element {
    console.log(title, imageURI);

    return (
        <>
            <View>
                <Image width={200} height={300} source={{ uri: imageURI }} />
            </View>
        </>
    )
}

export default function Library({ navigation, route }: navigationProps): JSX.Element {
    const [hasPermission] = usePermission();
    const [albums, setAlbums] = useState<Array<Album>>();
    const [folders, setFolders] = useState<PhotoIdentifiersPage[]>();

    const fetchAlbums = useCallback(async () => {
        const response = await CameraRoll.getAlbums({
            assetType: 'Photos',
        })

        setAlbums(response)
    }, [])

    useEffect(() => {
        if (hasPermission) {
            fetchAlbums()
        }

    }, [hasPermission])

    useEffect(() => {
        if (albums) {
            const gettingImages = albums.map(async album => {
                const response = await CameraRoll.getPhotos({
                    first: 5,
                    groupName: album.title
                })

                return response
            })

            Promise.all(gettingImages).then(response => {
                setFolders(response)
            })
        }
    }, [albums])

    useEffect(() => {
        if (folders) {
            // console.log(folders);
        }
    }, [folders])


    return (
        <>
            <SafeAreaView>
                <View>
                    <FlatList
                        numColumns={1}
                        keyExtractor={(_, index) => index.toString()}
                        data={folders}
                        renderItem={({ item, index }) => {
                            const title = item.edges[0].node.group_name
                            const imageURI = item.edges[0].node.image.uri

                            return (
                                <>
                                    <FolderView title={title} imageURI={imageURI} />
                                </>
                            )
                        }}

                    />
                    {/* <BottomAppbar navigation={navigation} route={route} /> */}
                </View>
            </SafeAreaView>
        </>
    )
}