import React, {useLayoutEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";

export const AboutScreen = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "О программе",
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
            <Text style={styles.textCenter}>Это приложение предназначено {'\n'}для тестирования навигации в ReactNative.</Text>
            <Text style={styles.textCenter}>Версия приложения: <Text style={{fontFamily: 'opensans-bold' }}>1.0.0</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    textCenter: {
        textAlign: 'center'
    }
})