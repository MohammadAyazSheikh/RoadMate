import React, { useRef, useEffect, useState } from 'react';
import { Animated, View, Image, Text, TextInput, TextInputProps, ViewStyle, Alert } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import colors from '../../theme/colors';
import IconFa from 'react-native-vector-icons/FontAwesome';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';

export default function Auth() {

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    const { styles, isPortrait, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icons/logo.png')}
                style={styles.iconStyle}
            />
            <View style={styles.headingView}>
                <Text style={styles.txtHeading} >
                    Join Us Via
                </Text>
                <Text style={styles.txtHeading} >
                    Phone Number
                </Text>
            </View>
            <TextBox
                icon={() => <IconFa name="phone"
                    style={styles.inputIconStyle}
                />}
                keyboardType='phone-pad'
                placeholder='Enter phone number eg: 0314 987654'
            />
            <CustomButton
                buttonText='Login'
            />
        </View>
    );
}

