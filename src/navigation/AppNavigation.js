import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {MainScreen} from "../screens/MainScreen";
import {AboutScreen} from "../screens/AboutScreen";
import {CreateScreen} from "../screens/CreateScreen";
import {PostScreen} from "../screens/PostScreen";
import {BookedScreen} from "../screens/BookedScreen";
import {THEME} from "../theme";
import {Platform} from "react-native";

const TabNavigator = createBottomTabNavigator()
export const AppTabNavigator = () => {
    return (
        <TabNavigator.Navigator screenOptions={tabStyle} >
            <TabNavigator.Screen
                name="AllPosts"
                component={MainScreen}
            />
            <TabNavigator.Screen
                name="BookedPosts"
                component={BookedScreen}
            />
        </TabNavigator.Navigator>
    )
}

const PostStack = createNativeStackNavigator()
export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <PostStack.Navigator screenOptions={headerStyle} >
                <PostStack.Screen
                    name="Home"
                    component={AppTabNavigator}
                    options={({route}) => {
                        return {
                            headerShown: false
                        }
                    }}
                />
                <PostStack.Screen
                    name="Post"
                    component={PostScreen}
                    options={{
                        title: "Post screen"
                    }}
                />
                <PostStack.Screen
                    name="Create"
                    component={CreateScreen}
                    options={{
                        title: "Create post screen",
                        headerTintColor: 'white'
                    }}
                />
                <PostStack.Group
                    screenOptions={{
                        presentation: 'modal'
                    }}
                >
                    <PostStack.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            title: "About screen"
                        }}
                    />
                </PostStack.Group>
            </PostStack.Navigator>
        </NavigationContainer>
    )
}

const headerStyle = {
    headerBackTitleVisible: false,
    // tabBarStyle: {
    //     backgroundColor: Platform.OS === 'ios' ? THEME.HEADER_BGCOLOR : THEME.HEADER_COLOR
    // },
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? THEME.HEADER_BGCOLOR : THEME.HEADER_COLOR,
    },
    headerTintColor: Platform.OS === 'ios' ? THEME.HEADER_COLOR : THEME.HEADER_BGCOLOR,
    headerTitleAlign: 'center',
}

const tabStyle = {
    tabBarStyle: {
        backgroundColor: Platform.OS === 'ios' ? THEME.HEADER_BGCOLOR : THEME.HEADER_COLOR
    },
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? THEME.HEADER_BGCOLOR : THEME.HEADER_COLOR,
    },
    tabBarActiveTintColor: Platform.OS === 'ios' ? THEME.HEADER_COLOR : THEME.HEADER_BGCOLOR,
    tabBarInactiveTintColor: 'lightgray',
}