import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, FlatList,ActivityIndicator } from 'react-native';
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
import { logoutError, logoutLoading, logoutSuccess } from '../../redux/features/user/userSlice';
import RideCard from '../../components/general/rideCard/rideSearchCard';
import { rideType } from '../../constants/types/sharedTypes';

export default function Profile() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state?.user);
    const [rideList, setRideList] = useState<rideType[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

    useEffect(() => {
        setIsLoading(true);
        firestore().collection('Rides')
            .where('rider.userId', '==', user.user?.userId)
            .get()
            .then(data => {

                //map data into our object type
                const rides: rideType[] = data.docs.map(item => {

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
                setIsLoading(false)
                setIsLoading(false);

            })
            .catch(err => {
                setIsLoading(false);
                console.log("Getting Rides Err:", JSON.stringify(err, null, 2));
            })
    }, [])




    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.imageView}>
                    {
                        user?.user?.profileImage ?
                            <Image
                                style={styles.imgStyle}
                                source={{ uri: user.user.profileImage }}
                            />
                            :
                            <Image
                                style={styles.imgStyle}
                                source={require('../../../assets/icons/user.jpg')}
                            />
                    }
                </View>
                <Text
                    style={styles.txtName}
                    numberOfLines={1}
                    allowFontScaling={fontStyle.fontScale}
                >
                    {`${user?.user?.firstName} ${user?.user?.lastName}`}
                </Text>
            </View>
            <CustomButton
                buttonText='Logout'
                style={styles.btnStyle}
                disabled={user.logoutLoading}
                isLoading={user.logoutLoading}
                onPress={() => {
                    dispatch(logoutLoading())
                    auth()
                        .signOut()
                        .then(() => {
                            dispatch(logoutSuccess())
                        })
                        .catch(err => {
                            console.log(JSON.stringify(err, null, 2))
                            dispatch(logoutError(err))
                        })
                }}
            />
            <View style={styles.row2}>
                <Text
                    style={styles.txtName}
                    numberOfLines={1}
                    allowFontScaling={fontStyle.fontScale}
                >
                    {"Your Rides"}
                </Text>
            </View>
            <View style={styles.fieldRow}>
                {
                    isLoading ?
                        <View style={styles.imgEmptyView}>
                            <ActivityIndicator
                                color={colors.yellow1}
                                size={"large"}
                            />
                        </View>
                        :
                        rideList != null && rideList.length < 1 ?
                            <View style={styles.imgEmptyView}>
                                <Image
                                    source={require('../../../assets/icons/empty-box.png')}
                                    style={styles.imgEmpty}
                                />
                                <Text
                                    allowFontScaling={fontStyle.fontScale}
                                    numberOfLines={3}
                                    style={styles.txtName}
                                >
                                    You did not share any ride
                                </Text>
                            </View>
                            :
                            <FlatList
                                contentContainerStyle={styles.scrollView}
                                keyExtractor={({ id }) => id!}
                                data={rideList}
                                renderItem={({ item }) => {
                                    return (
                                        <RideCard
                                            id={item.id}
                                            rider={item.rider}
                                            to={item.to}
                                            from={item.from}
                                            price={item.price}
                                            date={item.date}
                                            time={item.time}
                                            distance={item.distance}
                                            totalSeats={item.totalSeats}
                                            availableSeats={item.availableSeats}
                                        />
                                    )
                                }}
                            />}
            </View>
        </View>
    );
}

