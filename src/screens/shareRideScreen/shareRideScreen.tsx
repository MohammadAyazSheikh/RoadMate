import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconEn from 'react-native-vector-icons/Entypo';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
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

type locationObject = {
    long?: number,
    lat?: number,
    textAddr: string
}

export default function ShareRide() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [from, setFrom] = useState<locationObject | null>(null);
    const [fromErr, setFromErr] = useState<string | null>(null);
    const [to, setTo] = useState<locationObject | null>(null);
    const [toErr, setToErr] = useState<string | null>(null);
    const [when, setWhen] = useState<Date | null>(null);
    const [whenErr, setWhenErr] = useState<string | null>(null);
    const [noOfPassenger, setNoOfPassenger] = useState<number | null>(null);
    const [noOfPassengerErr, setNoOfPassengerErr] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [priceErr, setErrErr] = useState<string | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [distanceErr, setDistanceErr] = useState<string | null>(null);





    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {/* -----from---- */}
                <TextBox
                    icon={() =>
                        <IconEn name="location"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='email-address'
                    placeholder='From'
                    value={from?.textAddr ? from.textAddr : ''}
                    onChangeText={(value) => {

                    }}
                />
                {
                    fromErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {fromErr}
                    </Text>
                }

                {/* -----To---- */}
                <TextBox
                    icon={() =>
                        <IconEn name="location"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='email-address'
                    placeholder='To'
                    value={to?.textAddr ? to.textAddr : ''}
                    onChangeText={(value) => {

                    }}
                />
                {
                    toErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {toErr}
                    </Text>
                }
                {/* -----When---- */}
                <TextBox
                    icon={() =>
                        <IconAnt name="clockcircleo"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='email-address'
                    placeholder='When'
                    value={''}
                    onChangeText={(value) => {

                    }}
                />
                {
                    whenErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {whenErr}
                    </Text>
                }
                {/* -----Passenger---- */}
                <TextBox
                    icon={() =>
                        <IconAnt name="adduser"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='number-pad'
                    placeholder='Number of passengers'
                    value={noOfPassenger != null ? String(noOfPassenger) : undefined}
                    onChangeText={(value) => {

                    }}
                />
                {
                    noOfPassengerErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {noOfPassengerErr}
                    </Text>
                }
                {/* -----Distance---- */}
                <TextBox
                    icon={() =>
                        <IconFa name="road"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='number-pad'
                    placeholder='Pick & drop distance'
                    value={distance != null ? String(distance) : undefined}
                    onChangeText={(value) => {

                    }}
                />
                {
                    distanceErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {distanceErr}
                    </Text>
                }
                {/* -----Distance---- */}
                <TextBox
                    icon={() =>
                        <IconFa name="dollar"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='number-pad'
                    placeholder='Price per seat'
                    value={price != null ? String(price) : undefined}
                    onChangeText={(value) => {

                    }}
                />
                {
                    priceErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {priceErr}
                    </Text>
                }
            </ScrollView>

        </View>
    );
}

