import React, {useLayoutEffect} from "react";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {Ionicons} from "@expo/vector-icons";
import {PostList} from "../components/PostList";

export const BookedScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Избранное",
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

    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, postDate: post.date, postBooked: post.booked})
    }

    return <PostList data={DATA.filter(post => post.booked)} onOpen={openPostHandler} />
}

