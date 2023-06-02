import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconEn from 'react-native-vector-icons/Entypo';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';
import { validEmail } from '../../utils/functions/validations';
import auth, { } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { fontStyle } from '../../theme/fonts';
import { authError, authSuccess, authLoading } from '../../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import colors from '../../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/general/loader/loader';
import Toast from 'react-native-toast-message';
import Lottie from 'lottie-react-native';
import { Animated, Easing } from 'react-native';

export default function Home() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);


    const animationRef = useRef<Lottie>(null)

    useEffect(() => {
        animationRef.current?.play()

        // Or set a specific startFrame and endFrame with:
        animationRef.current?.play(0, 382 / 2);
    }, [])
    return (
        <View style={styles.container}>
            {/* book ride card */}
            <TouchableOpacity style={styles.cardStyle}
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate("SearchRide");
                }}
            >
                <View style={styles.animView}>
                    <Lottie
                        source={require('../../../assets/lottieFiles/ride1.json')}
                        loop={false}
                        autoPlay
                    />
                </View>
                <Text
                    style={styles.txtCard}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    Looking for a ride?
                </Text>
            </TouchableOpacity>
            {/* share ride card */}
            <TouchableOpacity style={styles.cardStyle}
                activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate("ShareRide");
                }}
            >
                <View style={styles.animView}>
                    <Lottie
                        source={require('../../../assets/lottieFiles/ride2.json')}
                        ref={animationRef}
                        loop={false}
                        autoPlay
                    />
                </View>
                <Text
                    style={styles.txtCard}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    Want to share your ride?
                </Text>
            </TouchableOpacity>

        </View>
    );
}

