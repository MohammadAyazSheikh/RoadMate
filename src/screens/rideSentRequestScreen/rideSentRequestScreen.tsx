import React, { useEffect, useState, } from 'react';
import { View, Image, Text, FlatList, ActivityIndicator, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import firestore from '@react-native-firebase/firestore';
import { fontStyle } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { rideReqType,} from '../../constants/types/sharedTypes';
import RideReqCard from '../../components/general/rideCard/rideSentReqCard';
import colors from '../../theme/colors';



export default function RideReqSent() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const user = useAppSelector(state => state?.user?.user);

 
    const [data, setData] = useState<rideReqType[] | null>([]);
    const [isLoading, setIsLoading] = useState(false);




    //getting data
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {


            setIsLoading(true);
            //getting data
            firestore().collection('RideRequests')
                .get()
                .then(data => {
                    //setting loading false


                    //filtering the data
                    const filteredRides = data.docs.filter(item => {
                        const data = item.data();

                        if (data.passenger.userId == user?.userId)
                            return true
                        else
                            return false
                    });


                    //map data into our object type
                    const cardData: rideReqType[] = filteredRides.map(item => {

                        const data = item.data();

                        const _data: rideReqType = {
                            id: item.id,
                            ride: data.ride,
                            bookedSeats: data.bookedSeats,
                            status: data.status,
                            passenger: data?.passenger
                        }
                        return _data;
                    });

                   
                    setData(cardData);

                    setIsLoading(false);

                })
                .catch(err => {
                    setIsLoading(false);
                    console.log("Getting Rides Req Err:", JSON.stringify(err, null, 2));
                })
        });

        return unsubscribe;
    }, [navigation]);




    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.container}>

            {/* list ride */}
            {
                isLoading ?
                    <View style={styles.imgEmptyView}>
                        <ActivityIndicator
                            color={colors.yellow1}
                            size={"large"}
                        />
                    </View>
                    :
                    data != null && data.length < 1 ?
                        <View style={styles.imgEmptyView}>
                            <Image
                                source={require('../../../assets/icons/empty-box.png')}
                                style={styles.imgEmpty}
                            />
                            <Text
                                allowFontScaling={fontStyle.fontScale}
                                numberOfLines={3}
                                style={styles.txtEmpty}
                            >
                                You don't have any ride request/booking
                            </Text>
                        </View>
                        :
                        <FlatList
                            contentContainerStyle={styles.scrollCard}
                            keyExtractor={({ id }) => id!}
                            data={data}
                            renderItem={({ item }) => {
                                return (

                                    <RideReqCard
                                        id={item.id}
                                        ride={item.ride}
                                        passenger={item.passenger}
                                        status={item.status}
                                        bookedSeats={item.bookedSeats}
                                    />
                                )
                            }}
                        />
            }
            {/* search ride modal */}
        </View>
    );
}

