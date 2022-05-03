import React, {useLayoutEffect} from "react";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {Ionicons} from "@expo/vector-icons";
import {PostList} from "../components/PostList";

export const MainScreen = ({navigation}) => {
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
    }, [navigation])

    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, postDate: post.date, postBooked: post.booked})
    }

    return <PostList data={DATA} onOpen={openPostHandler} />
}
