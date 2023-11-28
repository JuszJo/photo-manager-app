import { useCallback, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, Image, Text } from "react-native"
import { DrawerContext, navigationProps } from "../../App"
import BottomAppbar from "../home/BottomAppbar"
import usePermission from "../../hooks/usePermission";
import { CameraRoll, PhotoIdentifier, Album, PhotoIdentifiersPage } from "@react-native-camera-roll/camera-roll";
import { useState } from "react";
import Appbar from '../home/Appbar';

type folderviewProps = {
    title: string,
    imageURI: string
}

function FolderView({ title, imageURI }: folderviewProps): JSX.Element {
    return (
        <>
            <View>
                <View>
                    <Text style={style.folderViewText}>{title}</Text>
                </View>
                <View>
                    <Image style={style.folderView} source={{ uri: imageURI }} />
                </View>
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

    const { setShouldOpen } = useContext(DrawerContext)

    return (
        <>
            <SafeAreaView>
                <View>
                    <Appbar setShouldOpen={setShouldOpen} />
                    <FlatList
                        style={style.folderList}
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
                    <BottomAppbar navigation={navigation} route={route} />
                </View>
            </SafeAreaView>
        </>
    )
}

const style = StyleSheet.create({
    folderList: {
        // display: 'flex',
    },
    folderView: {
        width: '100%',
        height: 200,
        // marginBottom: 24,
        // paddingBottom: 24,
    },
    folderViewText: {
        fontSize: 20,
        color: '#1D1B20',
        fontFamily: 'Gadugi'
    }
})