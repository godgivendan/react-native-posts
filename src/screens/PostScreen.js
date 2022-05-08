import React, {useCallback, useLayoutEffect} from "react";
import {View, ScrollView, Text, StyleSheet, Image, Button, Alert} from "react-native";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {removePost, toggleBooked} from "../store/actions/post";


export const PostScreen = ({route, navigation}) => {
    const dispatch = useDispatch()
    const {postId, postDate, postBooked} = route.params
    const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))
    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

    const toggleHandler = useCallback(() => {
        // console.log(postId)
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Пост от ' + new Date(postDate).toLocaleDateString(),
            headerRight: () => {
                const iconName = booked ? 'ios-star' : 'ios-star-outline'
                return <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                    <Item title={'Favorite post'}
                          iconName={iconName}
                          onPress={toggleHandler}/>
                </HeaderButtons>
            },
        })
    }, [navigation, toggleHandler, booked])

    const removeHandler = () => {
        Alert.alert(
            'Удаление поста',
            'Вы точно хотите удалить пост?',
            [
                {text: 'Отменить', style: 'cancel'},
                {
                    text: 'Удалить', style: 'destructive', onPress: () => {
                        navigation.navigate('Home')
                        dispatch(removePost(postId))
                    }
                }
            ],
            {cancelable: false}
        )
    }

    if (!post) {
        return null
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