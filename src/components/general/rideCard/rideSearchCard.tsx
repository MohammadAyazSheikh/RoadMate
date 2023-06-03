import React, { useState } from 'react';
import { View, Text, Image, } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { orderTabProps } from '../../../routes/topRideRequestTab/topRideRequestTab';
import { fontStyle } from '../../../theme/fonts';
import CustomButton from '../customButton/customButton';
import { useAppSelector } from '../../../redux/hooks';
import { rideReqType, rideType, } from '../../../constants/types/sharedTypes';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import moment from 'moment';



const RideCard = ({ rider, time, date, price, totalSeats, availableSeats, to, from, distance, id, }: rideType) => {
    // const { rider, time, date, price, totalSeats, availableSeats, to, from } = data;
    const user = useAppSelector(state => state.user.user);
    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [seats, setSeats] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<StackNavigationProp<orderTabProps>>();

    return (
        <View style={styles.cardView}>
            <View style={styles.row}>
                <Text
                    style={styles.txtAvailable}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    {`Available seats ${availableSeats} out ${totalSeats}`}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={styles.priceRow}>
                    <Text
                        style={styles.txtPrice}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {`PKR${price}`}
                    </Text>
                    <Text
                        style={styles.txtAvailable}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        for 1 seat
                    </Text>
                </View>
            </View>
            <View style={styles.locationRow}>
                <View style={styles.locationInnerRow}>
                    <View style={styles.dotView}>
                        <View style={[styles.dotOuter, { backgroundColor: "#EF9400" }]}>
                            <View style={styles.dot} />
                        </View>
                        <View style={styles.line} />
                        <View style={styles.dotOuter}>
                            <View style={styles.dot} />
                        </View>
                    </View>
                    <View style={styles.locationTextView}>
                        <Text
                            style={styles.txtLocation}
                            allowFontScaling={fontStyle.fontScale}
                            numberOfLines={1}
                        >
                            {from?.textAddr}
                        </Text>
                        <Text
                            style={styles.txtLocation}
                            allowFontScaling={fontStyle.fontScale}
                            numberOfLines={1}
                        >
                            {to?.textAddr}
                        </Text>
                    </View>
                </View>
                {/* time */}
                <View style={{ paddingLeft: 10, alignItems: 'flex-end' }}>
                    <Text
                        style={styles.txtTime}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {moment(date).format("Do MMM")}
                    </Text>
                    <Text
                        style={styles.txtTime}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {moment(time).format("hh:mm A")}
                    </Text>
                </View>
            </View>
            {/* ---user info---- */}
            {
                user?.userId != rider.userId ?
                    <View style={styles.rowUserInfo}>
                        <View style={styles.imgView}>
                            {
                                rider?.profileImage ?
                                    <Image
                                        source={{ uri: rider?.profileImage }}
                                        style={styles.img}
                                    />
                                    :
                                    <Image
                                        source={require('../../../../assets/icons/user.jpg')}
                                        style={styles.img}
                                    />
                            }
                        </View>
                        <View>
                            <Text
                                style={styles.txtLocation}
                                allowFontScaling={fontStyle.fontScale}
                                numberOfLines={1}
                            >
                                {`${rider?.firstName} ${rider?.lastName}`}
                            </Text>
                        </View>
                    </View>
                    : null
            }
            {/* seats selector */}
            {(availableSeats > 0) && user?.userId != rider.userId ? <View style={styles.seatsSelectorView}>
                <Text
                    style={styles.txtTime}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    Select Seats
                </Text>
                <View
                    style={styles.seatsBtnRow}
                >
                    <CustomButton
                        buttonText='-'
                        style={styles.btnSeat}
                        textProps={{
                            style: styles.txtBtnSeat
                        }}
                        onPress={() => {
                            if (seats > 1) setSeats(seats - 1)
                        }}
                    />
                    <Text
                        style={styles.txtTime}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {seats}
                    </Text>
                    <CustomButton
                        buttonText='+'
                        style={styles.btnSeat}
                        textProps={{
                            style: styles.txtBtnSeat
                        }}
                        onPress={() => {
                            if (seats < availableSeats) setSeats(seats + 1)
                        }}

                    />
                </View>
            </View>
                : null
            }
            {
                user?.userId != rider.userId ?
                    <CustomButton
                        buttonText={isLoading ? "Sending request" : 'Join Now'}
                        isLoading={isLoading}
                        style={styles.btn}
                        // disabled={isLoading}
                        onPress={() => {


                            setIsLoading(true);

                            const data: rideReqType = {
                                bookedSeats: seats,
                                status: "pending",
                                passenger: user!,
                                ride: {
                                    id: id,
                                    rider,
                                    from,
                                    to,
                                    time,
                                    date,
                                    totalSeats,
                                    availableSeats,
                                    distance,
                                    price,
                                }
                            }


                            //adding data into to RideRequests collection
                            firestore()
                                .collection('RideRequests')
                                .add(data)
                                .then(() => {



                                    setIsLoading(false);

                                    navigation.navigate("RideReqSent")

                                    console.log('Ride Booked successfully! 🥳');

                                    Toast.show({
                                        type: 'successMsg',
                                        text1: 'Congrats',
                                        text2: 'Request Sent to the rider! 🥳',
                                        autoHide: true
                                    });

                                    // //updating data in Rides collection
                                    // firestore()
                                    //     .collection('Rides')
                                    //     .doc(id)
                                    //     .update({
                                    //         availableSeats: totalSeats - seats,
                                    //     })
                                    //     .then(() => {

                                    //     })
                                    //     .catch(err => {
                                    //         setIsLoading(false);

                                    //         Toast.show({
                                    //             type: 'errorMsg',
                                    //             text1: 'Error',
                                    //             text2: 'Facing error while booking ride 😐',
                                    //             autoHide: true
                                    //         });

                                    //         console.error('Facing error updating ride 😐', JSON.stringify(err));
                                    //     })

                                }).catch(err => {

                                    setIsLoading(false);

                                    Toast.show({
                                        type: 'errorMsg',
                                        text1: 'Error',
                                        text2: 'Facing error while booking ride 😐',
                                        autoHide: true
                                    });

                                    console.error('Facing error while booking ride 😐', JSON.stringify(err));
                                })
                        }}
                    />
                    : null
            }
        </View>
    );

}

export default RideCard;