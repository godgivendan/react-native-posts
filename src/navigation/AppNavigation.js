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
import {View, Text, Platform} from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator()
export const AppTabNavigator = () => {
    return (
        <TabNavigator.Navigator screenOptions={{...tabStyle, ...headerStyle}} >
            <TabNavigator.Screen
                name="AllPosts"
                component={MainScreen}
                options={{
                    tabBarLabel: "Все блоги",
                    tabBarIcon: info => (
                        <Ionicons name='ios-albums' size={25} color={info.color}/>
                    ),
                }}
            />
            <TabNavigator.Screen
                name="BookedPosts"
                component={BookedScreen}
                options={{
                    tabBarLabel: "Избранные блоги",
                    tabBarIcon: info => (
                        <Ionicons name='ios-star' size={25} color={info.color}/>
                    ),
                }}
            />
        </TabNavigator.Navigator>
    )
}

const StackNavigator = createNativeStackNavigator()
export const AppStackNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={headerStyle} >
            <StackNavigator.Screen
                name="Home"
                component={AppTabNavigator}
                options={({route}) => {
                    return {
                        headerShown: false
                    }
                }}
            />
            <StackNavigator.Screen
                name="Post"
                component={PostScreen}
                options={{
                    title: "Post screen"
                }}
            />
        </StackNavigator.Navigator>
    )
}
const AboutStackNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={headerStyle} >
            <StackNavigator.Screen
                name="AboutProgram"
                component={AboutScreen}
                options={{
                    title: "About screen"
                }}
            />
        </StackNavigator.Navigator>
    )
}

const CreateStackNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={headerStyle} >
            <StackNavigator.Screen
                name="CreatePost"
                component={CreateScreen}
                options={{
                    title: "About screen"
                }}
            />
        </StackNavigator.Navigator>
    )
}

const DrawerNavigator = createDrawerNavigator()
export const AppNavigation = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator.Navigator
                screenOptions={{
                    ...headerStyle,
                    drawerActiveTintColor: THEME.HEADER_COLOR,
                    drawerInactiveTintColor: THEME.MAIN_COLOR,
                    fontFamily: 'opensans-bold'
                }}
                drawerContent={(props) => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <DrawerItemList {...props} />
                            <View style={{padding: 20}}>
                                <Text style={{ color: 'black', fontFamily: 'opensans-bold' }}>Версия: 1.0.0</Text>
                            </View>
                        </DrawerContentScrollView>
                    );
                }}
            >
                <DrawerNavigator.Screen
                    name="PostList"
                    component={AppStackNavigator}
                    options={() => {
                        return {
                            drawerLabel: 'Блоги',
                            // drawerIcon: () => <Ionicons name='ios-star' size={24}/>,
                            headerShown: false
                        }
                    }}
                />
                <DrawerNavigator.Screen
                    name="Create"
                    component={CreateStackNavigator}
                    options={{
                        drawerLabel: 'Создать пост',
                        headerShown: false
                    }}
                />
                <DrawerNavigator.Screen
                    name="About"
                    component={AboutStackNavigator}
                    options={{
                        drawerLabel: 'О программе',
                        headerShown: false
                    }}
                />
            </DrawerNavigator.Navigator>
        </NavigationContainer>
    )
}


const headerStyle = {
    headerBackTitleVisible: false,
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
    tabBarActiveTintColor: Platform.OS === 'ios' ? THEME.HEADER_COLOR : THEME.HEADER_BGCOLOR,
    tabBarInactiveTintColor: Platform.OS === 'ios' ? 'gray' : 'lightsteelblue',
}