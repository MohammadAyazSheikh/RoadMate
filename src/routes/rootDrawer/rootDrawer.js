import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerProgress,
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import react, { } from 'react';
import colors from '../../theme/colors';
import IconIo from 'react-native-vector-icons/Ionicons'
import IconFa5 from 'react-native-vector-icons/FontAwesome5'

const Screen = () => {
    return (
        <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>
                👀
            </Text>
        </View>
    )
}

const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {




    return (
        <DrawerContentScrollView {...props}>
            <View>


                <DrawerItemList {...props} />
                {/* <DrawerItem
                    label="Help"
                    onPress={() => props?.navigation.navigate('Feed')}
                    activeTintColor="red"
                    inactiveTintColor='yellow'
                    a
                /> */}
            </View>
        </DrawerContentScrollView>
    );
}

export default function RootDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.green1,
                    width: 240,
                },
                drawerActiveBackgroundColor: colors.orange1,
                drawerActiveTintColor: colors.white1,
                drawerInactiveTintColor: colors.white1
            }}
            drawerContent={(props) => < CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Courses" component={Screen}
                options={{
                    drawerIcon: ({ size }) => {
                        return <IconFa5 name="book-open" color={colors.white1} size={25} />
                    }
                }}
            />
            <Drawer.Screen name="Districts" component={Screen}
                options={{
                    drawerIcon: ({ size }) => {
                        return <IconFa5 name="city" color={colors.white1} size={25} />
                    }
                }}
            />
            <Drawer.Screen name="Schools" component={Screen}
                options={{
                    drawerIcon: ({ size }) => {
                        return <IconFa5 name="school" color={colors.white1} size={25} />
                    }
                }}
            />
            <Drawer.Screen name="Users" component={Screen}
                options={{
                    drawerIcon: ({ size }) => {
                        return <IconFa5 name="user-alt" color={colors.white1} size={25} />
                    }
                }}
            />
            <Drawer.Screen name="Reports" component={Screen}
                options={{
                    drawerIcon: ({ size }) => {
                        return <IconFa5 name="chart-pie" color={colors.white1} size={25} />
                    }
                }}
            />
        </Drawer.Navigator >
    );
}