import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';





const Splash = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>()
    const { styles, isPortrait, heightToDp, widthToDp } = useFunctionalOrientation(responsiveStyles);


    const [isAnimEnded, setIsAnimEnded] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const logoAnim = useRef(new Animated.Value(0)).current;


    const scale = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.3]
    })

    const translateY = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [heightToDp(20), heightToDp(0)]
    })


    const StartAnim = () => {

        Animated.spring(logoAnim, {
            toValue: 1,
            // duration: 2500,
            stiffness: 30,
            useNativeDriver: true
        }).start(() => {
            setTimeout(() => {
                setIsAnimEnded(true);
            }, 1000);
        });
    };

    // useEffect(() => {
    //     if (props?.user?.user) {
    //         setIsUser(true)
    //     }
    // }, [props?.user]);


    useEffect(() => {
        if (isAnimEnded) {
            // isUser && navigation.navigate("Login");

            navigation.navigate("Auth");
        }
    }, [isUser, isAnimEnded]);


    useEffect(() => {
        StartAnim();
    }, [])

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[{
                    width: isPortrait ? widthToDp(30) : widthToDp(30),
                    height: isPortrait ? heightToDp(30) : heightToDp(30),

                    transform: [{ translateY }, { scale }]
                }]}
                source={require('./../../../assets/icons/logo.png')}
                resizeMode={"contain"}
            />
            <Text style={styles.textLogo}>
                Road Mate
            </Text>
        </View>
    );
}


export default (Splash);
