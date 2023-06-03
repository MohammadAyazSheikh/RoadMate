import React, { useState } from 'react';
import { View, Text, Image, TextInputProps, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';
import IconEn from 'react-native-vector-icons/Entypo';
import { fontStyle } from '../../../theme/fonts';
import CustomButton from '../customButton/customButton';
import { useAppSelector } from '../../../redux/hooks';
import { rideReqType, rideType, ridesStatusType } from '../../../constants/types/sharedTypes';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import moment from 'moment';

type bookingProcessType = "accepted" | "cancelledByRider";

const RideCard = ({ ride, status, bookedSeats, passenger, id }: rideReqType) => {

    const { rider, time, date, price, totalSeats, availableSeats, to, from, id: rideId } = ride;

    const [_status, _setStatus] = useState(status);
    const [_availableSeats, _setAvailableSeats] = useState(availableSeats);

    const user = useAppSelector(state => state.user.user);

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComplete, setIsLoadingCompleted] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);
    const [isLoadingReject, setIsLoadingReject] = useState(false);
    const [isLoadingAccept, setIsLoadingAccept] = useState(false);

    const processBooking = (type: ridesStatusType) => {
        console.log("ReqId = ", id)
        console.log("RideId = ", rideId)

        type == "accepted" && setIsLoadingAccept(true);
        type == "rejected" && setIsLoadingReject(true);
        type == "completed" && setIsLoadingCompleted(true);
        type == "cancelledByRider" && setIsLoadingCancel(true);

        let availSeats: number;


        if (type == "accepted")
            availSeats = _availableSeats - bookedSeats
        else if (type == "cancelledByRider")
            availSeats = _availableSeats + bookedSeats
        else {
            availSeats = _availableSeats;
        }

        firestore()
            .collection('RideRequests')
            .doc(id)
            .update({
                status: type,
                ride: {
                    ...ride,
                    availableSeats: availSeats
                }
            })
            .then(() => {


                //now updating the ride collection
                firestore()
                    .collection('Rides')
                    .doc(rideId)
                    .update({

                        ...ride,
                        availableSeats: availSeats

                    })
                    .then(() => {
                        Toast.show({
                            type: 'successMsg',
                            text1: 'Congrats',
                            text2: `You have ${type == "cancelledByRider" ? "cancelled" : status} ride successfully! 🥳`,
                            autoHide: true
                        });

                        _setStatus(type);
                        _setAvailableSeats(availSeats);

                        type == "accepted" && setIsLoadingAccept(false);
                        type == "rejected" && setIsLoadingReject(false);
                        type == "completed" && setIsLoadingCompleted(false);
                        type == "cancelledByRider" && setIsLoadingCancel(false);

                        console.log('You canceled ride successfully! 🥳');
                    })
                    .catch(err => {


                        type == "accepted" && setIsLoadingAccept(false);
                        type == "rejected" && setIsLoadingReject(false);
                        type == "completed" && setIsLoadingCompleted(false);
                        type == "cancelledByRider" && setIsLoadingCancel(false);

                        Toast.show({
                            type: 'errorMsg',
                            text1: 'Error',
                            text2: 'Something went wrong 😐',
                            autoHide: true
                        });

                        console.error('Facing error while updating ride collection 😐', JSON.stringify(err));
                    })
            })
            .catch(err => {
                setIsLoading(false);

                Toast.show({
                    type: 'errorMsg',
                    text1: 'Error',
                    text2: 'Something went wrong 😐',
                    autoHide: true
                });

                console.error('Facing error while ride cancelling 😐', JSON.stringify(err));
            });
    }

    return (
        <View style={styles.cardView}>
            <View style={styles.row}>
                <Text
                    style={styles.txtAvailable}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    {`Booked seats ${bookedSeats} out ${totalSeats}`}
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
            <View style={styles.rowUserInfo}>
                <View style={styles.imgView}>
                    {
                        passenger.profileImage ?
                            <Image
                                source={{ uri: passenger.profileImage }}
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
                        {`${passenger?.firstName} ${passenger?.lastName}`}
                    </Text>
                </View>
            </View>
            {/* seats selector */}

            <View style={styles.seatsSelectorView}>
                <Text
                    style={styles.txtTime}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    Status
                </Text>
                <Text
                    style={[
                        styles.txtAvailable,
                        {
                            color:
                                [
                                    "cancelledByRider",
                                    "cancelledByBooker",
                                    "rejected"
                                ].includes(_status) ?
                                    colors.red1
                                    :
                                    _status == "pending" ?
                                        colors.yellow1
                                        :
                                        _status == "accepted" ?
                                            colors.green1
                                            :
                                            colors.blue2
                        }
                    ]}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    {
                        _status == "accepted" ? "Accepted" : ""
                    }
                    {
                        _status == "pending" ? "Pending" : ""
                    }
                    {
                        _status == "completed" ? "Completed" : ""
                    }
                    {
                        _status == "rejected" ? "Rejected" : ""
                    }
                    {
                        _status == "cancelledByRider" ? "Cancelled by rider" : ""
                    }
                    {
                        _status == "cancelledByBooker" ? "Cancelled By Booker" : ""
                    }
                </Text>

            </View>
            {
                !["rejected", "cancelledByRider", "cancelledByBooker", "completed"].includes(_status) ?
                    <View style={styles.bottomBtnRow}>
                        {
                            // ========accept button=========
                            _status == "pending" ? <CustomButton
                                buttonText='Accept'
                                style={[styles.btnHalf, { backgroundColor: colors.green1 }]}
                                isLoading={isLoadingAccept}
                                disabled={isLoadingAccept}
                                onPress={() => {
                                    processBooking("accepted");
                                }}
                            />
                                : null
                        }

                        {
                            // ========Reject button=========
                            _status == "pending" ? <CustomButton
                                buttonText='Reject'
                                style={[styles.btnHalf, { backgroundColor: colors.red1 }]}
                                isLoading={isLoadingReject}
                                disabled={isLoadingReject}
                                onPress={() => {
                                    processBooking("rejected");
                                }}
                            />
                                : null
                        }

                        {
                            // ========Complete button=========
                            _status == "accepted" ? <CustomButton
                                buttonText='Complete'
                                style={[styles.btnHalf, { backgroundColor: colors.blue1 }]}
                                isLoading={isLoadingComplete}
                                disabled={isLoadingComplete}
                                onPress={() => {
                                    processBooking("completed");
                                }}
                            />
                                : null
                        }

                        {
                            // ========Cancel button=========
                            _status == "accepted" ? <CustomButton
                                buttonText='Cancel'
                                style={[styles.btnHalf, { backgroundColor: colors.red1 }]}
                                isLoading={isLoadingCancel}
                                disabled={isLoadingCancel}
                                onPress={() => {
                                    processBooking("cancelledByRider");
                                }}
                            />
                                : null
                        }

                    </View>
                    :
                    null
            }
           
        </View>
    );

}

export default RideCard;