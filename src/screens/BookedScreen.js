import React, {useLayoutEffect} from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {Ionicons} from "@expo/vector-icons";

export const BookedScreen = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Избранное",
            headerShown: true,
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.color} />
            ),
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title='Toggle Drawer' iconName='menu' onPress={() => {
                            console.log('Drawer toggled...')
                        }}/>
                    </HeaderButtons>
                )
            }
        })
    }, [navigation])

    const openPostHandler = (post) => {
        navigation.navigate('Post', {postId: post.id, postDate: post.date, postBooked: post.booked})
    }


    return (
        <View style={styles.wrapper}>
            <FlatList data={DATA.filter(post => post.booked)}
                      keyExtractor={post => post.id.toString()}
                      renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>}
            />
            {/*<Button title="Go to Post" onPress={() => goToPost()}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10

    }
})