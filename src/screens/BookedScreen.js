import React, {useLayoutEffect} from "react";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";

export const BookedScreen = ({navigation}) => {
    const bookedPosts = useSelector(state => state.post.bookedPosts)

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

    return <PostList data={bookedPosts} onOpen={openPostHandler} />
}

