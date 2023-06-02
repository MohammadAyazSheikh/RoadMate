import React, { useState } from 'react';
import { View, Text, Image, TextInputProps, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';
import IconEn from 'react-native-vector-icons/Entypo';
import { fontStyle } from '../../../theme/fonts';
import CustomButton from '../customButton/customButton';
import { rideType, userType } from '../../../constants/types/sharedTypes';
import moment from 'moment';



const RideCard = ( { rider, time, date, price, totalSeats, availableSeats, to, from }: rideType) => {
    // const { rider, time, date, price, totalSeats, availableSeats, to, from } = data;
    const { styles } = useFunctionalOrientation(responsiveStyles);


    return (
        <View style={styles.cardView}>
            <View style={styles.row}>
                <Text
                    style={styles.txtAvailable}
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                >
                    {`Available ride ${availableSeats} out ${totalSeats}`}
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
                <View style = {{paddingLeft:10,alignItems:'flex-end'}}>

                    <Text
                        style={styles.txtTime}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {moment(time).format("hh:mm a")}
                    </Text>

                    <Text
                        style={styles.txtTime}
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                    >
                        {moment(date).format("Do-MMM")}
                    </Text>
                </View>
            </View>
            {/* ---user info---- */}
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
            <CustomButton
                buttonText='Join Now'
                style={styles.btn}
            />
        </View>
    );

}

export default RideCard;