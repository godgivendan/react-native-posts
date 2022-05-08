import React from "react";
import {FlatList, StyleSheet, View, Text} from "react-native";
import {Post} from "./Post";

export const PostList = ({data = [], onOpen}) => {
    if (!data.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.noItems}>Пока постов нет...</Text>
        </View>
    }

    return (
        <View style={styles.wrapper}>
            <FlatList data={data}
                      keyExtractor={post => post.id.toString()}
                      renderItem={({item}) => <Post post={item} onOpen={onOpen}/>}
            />
            {/*<Button title="Go to Post" onPress={() => goToPost()}/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10

    },
    noItems: {
        fontFamily: 'opensans-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    }
})