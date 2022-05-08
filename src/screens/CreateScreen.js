import React, {useLayoutEffect, useRef, useState} from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard, Alert
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/post";
import {PhotoPicker} from "../components/PhotoPicker";

export const CreateScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imgRef = useRef()
    const photoPickerRef = useRef()
    const saveHandler = () => {
        if (text.trim().length < 3) {
            Alert.alert("Ошибка при создании поста!", "Длина текста не может быть меньше 3 символов!!!")
            return
        }
        if (!imgRef.current) {
            Alert.alert("Ошибка при создании поста!", "Необходимо добавить фото!!!")
            return
        }
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        navigation.navigate('Home')
        setText('')
        photoPickerRef.current.clearImage()
        imgRef.current = null
    }
    const photoPickHandler = (img_uri) => {
        imgRef.current = img_uri
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Создать пост",
            headerShown: true,
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title='Toggle Drawer' iconName='menu' onPress={() => {
                            navigation.toggleDrawer()
                        }}/>
                    </HeaderButtons>
                )
            }
        })
    }, [navigation])

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>Новый пост</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Введите текс поста"
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <PhotoPicker
                        ref={photoPickerRef}
                        style={styles.img}
                        onPick={photoPickHandler}
                    />
                    <Button
                        style={styles.btn}
                        title="Сохранить пост"
                        onPress={saveHandler}
                        disabled={!text || text.length < 3}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        paddingBottom: 40
    },
    title: {
        textAlign: 'center',
        fontFamily: 'opensans-bold',
        fontSize: 16,
        marginBottom: 20
    },
    textArea: {
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        marginBottom: 20,
        padding: 10,
        height: 200
    },
    img: {
        minHeight: 200,
        width: '100%',
        marginBottom: 20
    },
    btn: {}
})