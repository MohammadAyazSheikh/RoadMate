import React from "react";
import { StatusBar, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from "../../theme/colors";
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFn from 'react-native-vector-icons/Fontisto'
import Home from '../../screens/homeScreen/homeScreen';
import RideSentRequestScreen from "../../screens/rideSentRequestScreen/rideSentRequestScreen";
import RideReqRecv from "../../screens/rideReceivedRequestScreen/rideReceivedRequestScreen";
import { fontFamily, fontStyle } from "../../theme/fonts";

const Screen = () => {
    return (
        <View>
            <Text>
                test
            </Text>
        </View>
    )
}


export type orderTabProps = {
    RideReqSent: undefined;
    RideReqReceived: undefined;
};

const Tab = createMaterialTopTabNavigator<orderTabProps>();


const TopRideReqTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.grey1,
                tabBarInactiveTintColor: colors.white1,
                tabBarLabelStyle: { fontSize: 12, fontFamily:fontFamily.bold },
                tabBarIndicatorStyle:{
                    backgroundColor:colors.white1,
                    height:"100%"
                },
                tabBarStyle: {
                    backgroundColor: colors.yellow1
                },
            }}
        >
            <Tab.Screen name="RideReqSent" component={RideSentRequestScreen}
                options={{
                    title: "Sent Request"
                }}
            />
            <Tab.Screen name="RideReqReceived" component={RideReqRecv}
                options={{
                    title: "Received Request"
                }}
            />
        </Tab.Navigator>
    )
}

export default TopRideReqTab;