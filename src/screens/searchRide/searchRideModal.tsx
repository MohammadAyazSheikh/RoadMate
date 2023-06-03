import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView, Alert, Modal, ViewProps } from 'react-native';
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
import Header from '../../components/general/screenHeader/header';
import { calculateDistance } from '../../utils/functions/generalFunctions';

const initialRegion = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
}

type cardType = { rider: userType } & rideType

type typeLocationSelector = {
    isOpen: boolean,
    onClose: () => void,
    location?: locationType | null,
    setLocation?: (location: locationType) => void,
    centerViewProps?: ViewProps,
    modalViewProps?: ViewProps,
    backDropProps?: ViewProps,
    setIsLoading: (isLoading: boolean) => void
    setRideList: (data: rideType[]) => void
}

export default function SearchRideModal({
    isOpen,
    onClose,
    centerViewProps,
    modalViewProps,
    backDropProps,
    setIsLoading,
    setRideList
}: typeLocationSelector) {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [from, setFrom] = useState<locationType | null>(initialRegion);
    const [fromErr, setFromErr] = useState<string | null>(null);
    const [to, setTo] = useState<locationType | null>(initialRegion);
    const [toErr, setToErr] = useState<string | null>(null);


    //for modals
    const [openFromModal, setOpenFromModal] = useState(false);
    const [openToModal, setOpenToModal] = useState(false);



    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isOpen}
                onRequestClose={onClose}
            >
                <View
                    style={styles.backDrop}
                    {...backDropProps}
                />
                <View
                    style={styles.centeredView}
                    {...centerViewProps}
                >
                    <View
                        style={styles.modalView}
                        {...modalViewProps}
                    >
                        <Header
                            title='Search'
                            onPressLeft={onClose}
                        />
                        <ScrollView contentContainerStyle={styles.scrollViewModal}>
                            <View
                                style={styles.imgIconView}
                            >
                                <Image
                                    source={require('../../../assets/icons/route.png')}
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
                                inputViewStyle={{ width: "100%" }}
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
                                inputViewStyle={{ width: "100%" }}
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

                            {/* ======button========== */}
                            <CustomButton
                                buttonText='Search'
                                style={styles.btnModal}
                                onPress={async () => {
                                    //setting errors if fields are empty
                                    if (!from)
                                        setFromErr("Please select you location");
                                    if (!to)
                                        setToErr("Please select you location");


                                    if ((from && to) && (!fromErr && !toErr)) {

                                        setIsLoading(true);

                                        firestore().collection('Rides').get()
                                            .then(data => {
                                                //setting loading false


                                                //filtering the data
                                                const filteredRides = data.docs.filter(item => {
                                                    const data = item.data();

                                                    //calculating distance

                                                    const latFrom1 = data.from.latitude;
                                                    const lonFrom1 = data.from.longitude;

                                                    const latTo1 = data.to.latitude;
                                                    const lonTo1 = data.to.longitude;

                                                    const distanceFrom = calculateDistance(latFrom1, lonFrom1, from.latitude!, from.longitude!);

                                                    const distanceTo = calculateDistance(latTo1, lonTo1, to.latitude!, to.longitude!);

                                                    //only return the items which are in radius of rider defined distance
                                                    if ((distanceFrom < data.distance) && (distanceTo < data.distance)
                                                        && data.rider.userId != user.user?.userId &&
                                                        data.availableSeats > 0)
                                                        return true;
                                                    else
                                                        false;
                                                });


                                                //map data into our object type
                                                const rides: rideType[] = filteredRides.map(item => {

                                                    const data = item.data();


                                                    const _data: rideType = {
                                                        id: item.id,
                                                        rider: data.rider,
                                                        from: data.from,
                                                        to: data.to,
                                                        time: data.time,
                                                        date: data.date,
                                                        availableSeats: data.availableSeats,
                                                        totalSeats: data.totalSeats,
                                                        distance: data.distance,
                                                        price: data.price,
                                                    }
                                                    return _data
                                                });

                                                setRideList(rides);
                                                onClose && onClose()
                                                setIsLoading(false);

                                            })
                                            .catch(err => {
                                                setIsLoading(false);
                                                console.log("Getting Rides Err:", JSON.stringify(err, null, 2));
                                            })

                                    }
                                }}
                            />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
        </View>
    );

}

