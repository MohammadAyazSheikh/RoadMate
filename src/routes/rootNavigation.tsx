import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import colors from '../theme/colors';
import AuthScreen from '../screens/authScreen/authScreen';
import Splash from '../screens/splashScreen/splashScreen';
import Registration from '../screens/registrationScreen/registrationScreen';
import AddUserInfo from '../screens/addUserInfoScreen/addUserInfoScreen';
import RootDrawer from './rootDrawer/rootDrawer';
import { useAppSelector } from './../redux/hooks';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type RootStackProps = {
  Splash: undefined;
  Auth: undefined;
  Registration: undefined;
  User: undefined;
  AddUserInfo: undefined;
  RootDrawer: undefined;
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
      <Stack.Screen
        name="Registration"
        component={Registration}
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

const AddInfoRoute = () => {
  return (
    <>
      <Stack.Screen
        name="AddUserInfo"
        component={AddUserInfo}
        options={{
          headerShown: false,
        }}
      />

    </>
  );
};



function RootNav() {



  const user = useAppSelector(state => state.user);


  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {

    console.log("===auth state change=====");
    console.log(JSON.stringify(user, null, 2));
    // setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);



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
        {
          !user.user?.firstName && user.user?.email ?
            AddInfoRoute()
            :
            user.user ?
              UserRoute()
              :
              AuthRoute()
        }
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default (RootNav);
