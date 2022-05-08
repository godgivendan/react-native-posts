import React, {forwardRef, useImperativeHandle, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {Image, View, Button, Alert, StyleSheet} from "react-native";



export const PhotoPicker = forwardRef(({onPick}, ref) => {
    const [camera_status, camera_requestPermission] = ImagePicker.useCameraPermissions();
    const [media_status, media_requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState(null)
    useImperativeHandle(ref, () => ({
        clearImage() {
            setImage(null)
        },
    }))
    const checkCameraPermissions = async () => {
        console.log("checkCameraPermissions STATUS: "+JSON.stringify(camera_status))
        console.log("checkCameraPermissions STATUS : "+(camera_status.status != 'granted'?'TRUE':'FALSE'))
        if (camera_status.status === 'granted') {
            return true
        } else {
            if (camera_status.canAskAgain) {
                let res = await camera_requestPermission({})
                console.log("checkCameraPermissions RES: "+JSON.stringify(res))
                if (res.status === 'granted') {
                    return true
                }
            }
            return false
        }

    }

    const checkMediaPermissions = async () => {
        console.log("checkMediaPermissions STATUS: "+JSON.stringify(media_status))
        console.log("checkMediaPermissions STATUS : "+(media_status.status != 'granted'?'TRUE':'FALSE'))
        if (media_status.status === 'granted') {
            return true
        } else {
            if (media_status.canAskAgain) {
                let res = await media_requestPermission({})
                console.log("checkMediaPermissions RES: "+JSON.stringify(res))
                if (res.status === 'granted') {
                    return true
                }
            }
            return false
        }

    }
    const takePhoto = async () => {
        Alert.alert(
            'Загрузка фото',
            'Вы хотите загрузить фото с камеры или из медиа библиотеки?',
            [
                {text: 'Отменить', style: 'cancel'},
                {
                    text: 'Камера', onPress: async () => {
                        const hasPermissions = await checkCameraPermissions()
                        if (!hasPermissions) {
                            Alert.alert("Ошибка!", "У Вас нет доступа на создание фото!")
                            return
                        }
                        const img_res = await ImagePicker.launchCameraAsync({
                            quality: 0.7,
                            allowsEditing: false,
                            aspect: [16, 9]
                        })

                        console.log(img_res)
                        if (!img_res.cancelled) {
                            setImage(img_res.uri);
                            onPick(img_res.uri)
                        }
                    }
                },
                {
                    text: 'Медиабиблиотека', onPress: async () => {
                        const hasPermissions = await checkMediaPermissions()
                        if (!hasPermissions) {
                            Alert.alert("Ошибка!", "У Вас нет доступа на фотогалерее!")
                            return
                        }
                        const img_res = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.All,
                            allowsEditing: false,
                            quality: 1,
                        })

                        console.log(img_res)
                        if (!img_res.cancelled) {
                            setImage(img_res.uri);
                            onPick(img_res.uri)
                        }
                    }
                }
            ],
            {cancelable: false}
        )


    }

    return (
        <View style={styles.wrapper}>
            <Button title="Сделать фото" onPress={takePhoto} />
            {image && <Image style={styles.img} source={{uri: image}}/>}
        </View>
    )

})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        marginBottom: 10
    },
    img: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
})