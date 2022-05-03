import React, {useLayoutEffect} from "react";
import {View, StyleSheet, FlatList} from "react-native";
import {DATA} from "../data";
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {Ionicons} from "@expo/vector-icons";

export const MainScreen = ({route, navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Блоги",
            headerShown: true,
            tabBarIcon: info => (
                <Ionicons name='ios-albums' size={25} color={info.color}/>
            ),
            headerTitleAlign: 'center',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item title='Take photo' iconName='ios-camera' onPress={() => {
                            console.log('Photo pressed...')
                        }}/>
                    </HeaderButtons>
                )
            },
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
            <FlatList data={DATA}
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