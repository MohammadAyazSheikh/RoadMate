import React, { useEffect } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import colors from '../theme/colors';
import AuthScreen from '../screens/authScreen/authScreen';
import Splash from '../screens/splashScreen/splashScreen';
import AddUserInfo from '../screens/addUserInfoScreen/addUserInfoScreen';

export type RootStackProps = {
  Splash: undefined;
  Auth: undefined;
  User: undefined;
  AddUserInfo: undefined;
};

const Screen = () => {
  return (
    <View>
      <Text>
        test
      </Text>
    </View>
  )
}


const Stack = createStackNavigator<RootStackProps>();



const AuthRoute = () => {
  return (
    <>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />

    </>
  );
};

const UserRoute = () => {
  return (
    <>
      <Stack.Screen
        name="User"
        component={Screen}
        options={{
          headerShown: false,
        }}
      />

    </>
  );
};



function RootNav() {



  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DefaultTheme.colors,
          background: colors.grey1,
        },
      }}
    >
      <StatusBar
        backgroundColor={colors.grey1}
        // hidden={isPortrait ? false : true}
        animated
      />
      <>
        <Stack.Navigator
          initialRouteName={"Splash"}
          screenOptions={{
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: 'tomato',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // animationEnabled: false
          }}>

          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddUserInfo"
            component={AddUserInfo}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  );
}

export default (RootNav);
