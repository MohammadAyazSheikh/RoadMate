import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView, Alert, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconEn from 'react-native-vector-icons/Entypo';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';
import { validEmail } from '../../utils/functions/validations';
import auth, { } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { fontStyle } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import LocationSelector from '../../components/general/locationSelectorModal/locationSelector';
import Toast from 'react-native-toast-message';
import moment from "moment";
import { locationType, rideType, userType } from '../../constants/types/sharedTypes';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Loader from '../../components/general/loader/loader';


const initialRegion = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
}
export default function ShareRide() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [from, setFrom] = useState<locationType | null>(initialRegion);
    const [fromErr, setFromErr] = useState<string | null>(null);
    const [to, setTo] = useState<locationType | null>(initialRegion);
    const [toErr, setToErr] = useState<string | null>(null);
    const [when, setWhen] = useState<Date>(new Date);
    const [whenErr, setWhenErr] = useState<string | null>(null);
    const [rideDate, setRideDate] = useState<Date>(new Date);
    const [rideDateErr, setRideDateErr] = useState<string | null>(null);
    const [noOfSeats, setNoOfSeats] = useState<number | null>(null);
    const [noOfSeatsErr, setNoOfSeatsErr] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [priceErr, setPriceErr] = useState<string | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [distanceErr, setDistanceErr] = useState<string | null>(null);

    //for modals
    const [openFromModal, setOpenFromModal] = useState(false);
    const [openToModal, setOpenToModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const showDateTime = (
        setValue: (value: Date) => void,
        mode: "date" | "time" = "date") => {
        DateTimePickerAndroid.open({
            value: when,
            onChange: (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
                const currentDate = selectedDate;
                setValue(currentDate!);
            },
            mode,
            is24Hour: true,
        });
    };



    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View
                    style={styles.imgIconView}
                >
                    <Image
                        source={require('../../../assets/icons/car-sharing.png')}
                        style={styles.imgIcon}
                    />
                </View>
                {/* -----from---- */}
                <TextBox
                    icon={() =>
                        <IconEn name="location"
                            style={styles.inputIconStyle}
                        />}
                    placeholder='From'
                    value={from?.textAddr ? from.textAddr : ''}
                    onPressIn={() => setOpenFromModal(true)}
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
                    placeholder='To'
                    value={to?.textAddr ? to.textAddr : ''}
                    onPressIn={() => setOpenToModal(true)}
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
                    placeholder='When'
                    onPressIn={() => { showDateTime(setWhen, "time") }}
                    value={moment(when).format("hh:mm a")}
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
                {/* -----departure date---- */}
                <TextBox
                    icon={() =>
                        <IconAnt name="calendar"
                            style={styles.inputIconStyle}
                        />}
                    placeholder='Departure date'
                    onPressIn={() => { showDateTime(setRideDate, "date") }}
                    value={moment(rideDate).format("Do-MMM-YYYY")}

                />
                {
                    rideDateErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {rideDateErr}
                    </Text>
                }
                {/* -----Passenger---- */}
                <TextBox
                    icon={() =>
                        <IconMtc name="car-seat"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='number-pad'
                    placeholder='Available seats'
                    value={noOfSeats != null ? String(noOfSeats) : undefined}
                    onChangeText={(value) => {
                        value != "" ?
                            setNoOfSeats(parseInt(value))
                            :
                            setNoOfSeats(null)
                        if (parseInt(value) > 0) {
                            setNoOfSeatsErr(null);
                        }
                        else {
                            setNoOfSeatsErr("No of seats must be more than 1")
                        }

                        if (!value) {
                            setNoOfSeatsErr("Available seats cannot be empty")
                        }
                    }}
                />
                {
                    noOfSeatsErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {noOfSeatsErr}
                    </Text>
                }
                {/* -----Distance---- */}
                <TextBox
                    icon={() =>
                        <IconFa name="road"
                            style={styles.inputIconStyle}
                        />}
                    keyboardType='number-pad'
                    placeholder='Pick & drop distance in meters'
                    value={distance != null ? String(distance) : undefined}
                    onChangeText={(value) => {
                        value != "" ?
                            setDistance(parseInt(value))
                            :
                            setDistance(null)
                        if (parseInt(value) < 5) {
                            setDistanceErr("Pickup distance must be more than 4 meters")
                        }
                        else {
                            setDistanceErr(null)
                        }

                        if (!value) {
                            setDistanceErr("Distance cannot be empty")
                        }
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
                        value != "" ?
                            setPrice(parseInt(value))
                            :
                            setPrice(null)

                        if (parseInt(value) < 1) {
                            setPriceErr("Price cannot be zero")
                        }
                        else {
                            setPriceErr(null)
                        }

                        if (!value) {
                            setPriceErr("Price cannot be empty")
                        }
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
                <CustomButton
                    buttonText='Publish'
                    onPress={() => {
                        //setting errors if fields are empty
                        if (!from)
                            setFromErr("Please select you location");
                        if (!to)
                            setToErr("Please select you location");
                        if (!when)
                            setWhenErr("Please select pickup time");
                        if (!rideDate)
                            setRideDateErr("Please select pickup date");
                        if (!noOfSeats)
                            setNoOfSeatsErr("Please select no of seats");
                        if (!distance)
                            setDistanceErr("Please select distance");
                        if (!price)
                            setPriceErr("Please select price");

                        if ((from && to && when && rideDate && noOfSeats && distance && price) &&
                            (!fromErr && !toErr && !whenErr && !rideDateErr && !noOfSeatsErr && !distanceErr && !priceErr)) {

                            setIsLoading(true);

                            const ride: rideType = {
                                rider: user.user!,
                                from: from,
                                to: to,
                                time: when,
                                date: rideDate,
                                totalSeats: noOfSeats,
                                availableSeats:noOfSeats,
                                distance: distance,
                                price: price
                            }

                            console.log(JSON.stringify(ride, null, 2));

                            firestore()
                                .collection('Rides')
                                .add(ride)
                                .then(() => {

                                    setIsLoading(false);

                                    Toast.show({
                                        type: 'successMsg',
                                        text1: 'Congrats 🥳',
                                        text2: 'Ride created success fully!',
                                        autoHide: true
                                    });

                                    console.log('Ride added 🥳');
                                }).catch(err => {

                                    setIsLoading(false);

                                    Toast.show({
                                        type: 'errorMsg',
                                        text1: 'Failed 😢',
                                        text2: 'Error while adding ride!',
                                        autoHide: true
                                    });

                                    console.error('ride adding failed', JSON.stringify(err));
                                })
                        }
                    }}
                />
            </ScrollView>
            {/* for from field */}
            <LocationSelector
                isOpen={openFromModal}
                onClose={() => setOpenFromModal(false)}
                location={from}
                setLocation={setFrom}
            />
            {/* for to field */}
            <LocationSelector
                isOpen={openToModal}
                onClose={() => setOpenToModal(false)}
                location={to}
                setLocation={setTo}
            />
            {/* loader */}
            <Loader
                showLoader={isLoading}
            />
        </View>
    );
}

