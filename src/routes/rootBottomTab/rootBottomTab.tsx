import React from "react";
import { StatusBar, View, Text } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../theme/colors";
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFn from 'react-native-vector-icons/Fontisto'
import Home from '../../screens/homeScreen/homeScreen';

const Screen = () => {
    return (
        <View>
            <Text>
                test
            </Text>
        </View>
    )
}


export type RootTabProps = {
    Home: undefined;
    Profile: undefined;
    Notification: undefined
};

const Tab = createBottomTabNavigator<RootTabProps>();


const RootTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.grey1,
                tabBarInactiveTintColor: colors.white1,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: colors.yellow1

                },
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconAnt
                            name="home"
                            color={color}
                            size={focused ? 25 : 20}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Notification" component={Screen}

                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconFn
                            name="bell"
                            color={color}
                            size={focused ? 25 : 20}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Screen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconAnt
                            name="user"
                            color={color}
                            size={focused ? 25 : 20}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default RootTab;