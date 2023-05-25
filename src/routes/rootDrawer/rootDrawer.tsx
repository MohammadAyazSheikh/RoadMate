
import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Screen = () => {
    return (
        <View>
            <Text>
                test
            </Text>
        </View>
    )
}


export type RootDrawerProps = {
    Home: undefined;
    Profile: undefined;
};


const Drawer = createDrawerNavigator<RootDrawerProps>();

function RootDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Screen} />
            <Drawer.Screen name="Profile" component={Screen} />
        </Drawer.Navigator>
    );
}

export default RootDrawer;