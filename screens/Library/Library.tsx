import { useCallback, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, View, FlatList, Image, Text, Pressable } from "react-native"
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
            <View style={style.folderView}>
                <View style={style.folderTextView}>
                    <Text style={style.folderViewText}>{title}</Text>
                </View>
                <View>
                    <Image style={style.image} source={{ uri: imageURI }} />
                </View>
            </View>
        </>
    )
}

export default function Library({ navigation, route }: navigationProps): JSX.Element {
    const [hasPermission] = usePermission();
    const [albums, setAlbums] = useState<Array<Album>>();
    const [folders, setFolders] = useState<PhotoIdentifiersPage[]>();

    const { shouldOpen, setShouldOpen } = useContext(DrawerContext)

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

    return (
        <>
            <SafeAreaView style={{backgroundColor: 'rgb(245, 245, 245)'}}>
                <View style={{ opacity: shouldOpen ? 0.5 : 1 , height: '100%'}} onTouchStart={() => {
                    if(shouldOpen) {
                        setShouldOpen(false)
                    }
                }}>
                    <View style={{marginBottom: 16}}>
                        <Appbar setShouldOpen={setShouldOpen} />
                    </View>
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
                                    <Pressable onPress={() => navigation.navigate('Album', { title: title})}>
                                        <FolderView title={title} imageURI={imageURI} />
                                    </Pressable>
                                </>
                            )
                        }}

                    />
                    <View>
                        <BottomAppbar navigation={navigation} route={route} />
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const style = StyleSheet.create({
    folderList: {
        height: '80%',
        paddingHorizontal: 16,
    },
    folderView: {
        marginBottom: 24,
    },
    folderTextView: {
        marginBottom: 8
    },
    folderViewText: {
        fontSize: 18,
        color: '#1D1B20',
        fontFamily: 'Gadugi'
    },
    image: {
        width: '100%',
        height: 210,
        borderRadius: 4,
    },
})