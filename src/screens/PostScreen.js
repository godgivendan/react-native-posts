import React, {useLayoutEffect} from "react";
import {View, ScrollView, Text, StyleSheet, Image, Button, Alert} from "react-native";
import {DATA} from "../data";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";


export const PostScreen = ({route, navigation}) => {
    const {postId, postDate, postBooked} = route.params
    const post = DATA.find(p => p.id === postId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Пост от ' + new Date(postDate).toLocaleDateString(),
            headerRight: () => {
                const iconName = postBooked ? 'ios-star' : 'ios-star-outline'
                return <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item title={'Favorite post'}
                          iconName={iconName}
                          onPress={() => {
                              console.log('Star pressed...')
                          }}/>
                </HeaderButtons>
            },
        })
    }, [navigation])

    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {text: 'Отменить', style: 'cancel'},
                {
                    text: 'Удалить', style: 'destructive', onPress: () => {
                    }
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <ScrollView style={styles.center}>
            <Image style={styles.image} source={{uri: post.img}}/>
            <View style={styles.textWrap}>
                <Text>{post.text}</Text>
            </View>
            <View style={styles.buttonBar}>
                <Button title='Редактировать'/>
                <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
    image: {
        height: 200,
        width: '100%'
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'opensans-regular'
    },
    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})