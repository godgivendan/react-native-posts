import React, {useLayoutEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const CreateScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Создать пост",
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

    return (
        <View style={styles.center}>
            <Text>CreateScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})