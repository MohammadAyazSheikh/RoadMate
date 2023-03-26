import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFunctionalOrientation } from "../../utils/functions/responsiveUtils";
import colors from "../../theme/colors";
import IconAnt from "react-native-vector-icons/AntDesign";
import { View, Text } from "react-native";
// import NavButtonCenter, { NavIcon } from '../../components/nav/customNavButton/navButton';
import IconFont from "react-native-vector-icons/FontAwesome";





const Tab = createBottomTabNavigator();



export default BottomTab = (props) => {

    const { isPortrait, widthToDp, heightToDp } = useFunctionalOrientation(() => { });
    const iconFocusedSize = isPortrait ? widthToDp(7) : heightToDp(7);
    const iconUnfocusedSize = isPortrait ? widthToDp(6) : heightToDp(6)

    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: colors.golden1,
                    tabBarInactiveTintColor: colors.white1,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: {
                        fontSize: isPortrait ? widthToDp(4) : heightToDp(4),
                    },
                    tabBarBadgeStyle: {
                        // color: backGround,
                        backgroundColor: 'red'
                    },
                    //  tabBarIconStyle
                    tabBarStyle: {
                        alignItems: 'center',
                        backgroundColor: colors.purple2,
                        borderColor: "transparent",
                        height: isPortrait ? heightToDp(7.5) : widthToDp(7.5),
                        position: 'absolute',
                        bottom: 10,
                        marginHorizontal: 10,
                        borderRadius: 20,
                        borderColor: 'transparent',
                        // overflow: 'hidden',
                        // ...getShadow({ elevation: 500, shadowRadius: 500 })
                    },
                    headerShown: false,
                }
            }
        >
            {/* <Tab.Screen name="Home" component={HomeTopTab}
                options={{
                    // tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconAnt
                            name="home"
                            color={color}
                            size={focused ? iconFocusedSize : iconUnfocusedSize}
                        />
                    ),
                    // tabBarBadge: 0,
                    tabBarButton: (props) => {
                        return (
                            <NavIcon {...props} />
                        )
                    }
                }}
            />
            <Tab.Screen name="Inbox" component={InboxScreen}
                options={{
                    // tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconAnt
                            name="mail"
                            color={color}
                            size={focused ? iconFocusedSize : iconUnfocusedSize}
                        />
                    ),
                    // tabBarBadge: 0,
                    tabBarButton: (props) => {
                        return (
                            <NavIcon {...props} />
                        )
                    }
                }}
            />
            <Tab.Screen component={logoutScreen}
                name="CenterButton"
                options={{
                    // // tabBarLabel: 'Updates',
                    // tabBarIcon: (prop_) => {
                    //     return <NavButton {...props} {...prop_ } />
                    // },
                    // // tabBarBadge: 0,
                    tabBarButton: () => {
                        return (
                            <NavButtonCenter {...props} />
                        )
                    }
                }}
            />
            <Tab.Screen name="ServiceOrderList" component={serviceTopTab}
                options={{
                    // tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconFont
                            name="bullhorn"
                            color={color}
                            size={focused ? iconFocusedSize : iconUnfocusedSize}
                        />
                    ),
                    // tabBarBadge: 0,
                    tabBarButton: (props) => {
                        return (
                            <NavIcon {...props} />
                        )
                    }
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    // tabBarLabel: 'Updates',
                    tabBarIcon: ({ color, size, focused }) => (
                        <IconAnt
                            name="user"
                            color={color}
                            size={focused ? iconFocusedSize : iconUnfocusedSize}
                        />
                    ),
                    // tabBarBadge: 0,
                    tabBarButton: (props) => {
                        return (
                            <NavIcon {...props} />
                        )
                    }
                }}
            /> */}
        </Tab.Navigator>
    );
}