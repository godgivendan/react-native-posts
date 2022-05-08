import React, {useEffect, useLayoutEffect} from "react";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/actions/post";
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {THEME} from "../theme";

export const MainScreen = ({navigation}) => {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Блоги",
            headerShown: true,
            headerTitleAlign: 'center',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title='Take photo' iconName='ios-camera' onPress={() => {
                            navigation.navigate('Create', {})
                        }}/>
                    </HeaderButtons>
                )
            },
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
        // Загрузка данных
        dispatch(loadPosts())
    }, [navigation, dispatch])
    const allPosts = useSelector(state => state.post.allPosts)

    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, postDate: post.date, postBooked: post.booked})
    }

    const loading = useSelector(state => state.post.loading)
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    return <PostList data={allPosts} onOpen={openPostHandler} />
}


const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})