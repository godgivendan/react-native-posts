import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {DATA} from "../data";
import {Post} from "./Post";

export const PostList = ({data, onOpen}) => {
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

    }
})