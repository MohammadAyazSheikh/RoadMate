import React, { useEffect, useState, } from 'react';
import { View, Image, Text, FlatList, ActivityIndicator, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconFa from 'react-native-vector-icons/FontAwesome';
import TextBox from '../../components/general/textBox/textBox';
import { fontStyle } from '../../theme/fonts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { rideType } from '../../constants/types/sharedTypes';
import RideCard from '../../components/general/rideCard/rideSearchCard';
import SearchRideModal from './searchRideModal';
import colors from '../../theme/colors';


export default function ShareRide() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();


    const [rideList, setRideList] = useState<rideType[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    //for modals
    const [openSearchModal, setSearchModal] = useState(false);


    useEffect(() => {
        // console.log("Getting Rides Successfully:", JSON.stringify(rideList, null, 2))
        rideList?.map(data => {
            console.log(data.rider.firstName)
        })
    }, [rideList])


    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.container}>
            <TextBox
                inputViewStyle={{ marginVertical: 20 }}
                placeholder='Search Ride'
                icon={
                    () =>
                        <IconFa name="search"
                            style={styles.inputIconStyle}
                        />
                }
                onPressIn={() => { setSearchModal(true) }}
            />
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
                    rideList == null  ?
                        <View style={styles.imgEmptyView}>
                            <Image
                                source={require('../../../assets/icons/searchCar.png')}
                                style={styles.imgEmpty}
                            />
                            <Text
                                allowFontScaling={fontStyle.fontScale}
                                numberOfLines={1}
                                style={styles.txtEmpty}
                            >
                                Search ride near you
                            </Text>
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
                                    numberOfLines={1}
                                    style={styles.txtEmpty}
                                >
                                    No ride found near you
                                </Text>
                            </View>
                            :
                            <FlatList
                                contentContainerStyle={styles.scrollCard}
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
                            />
            }
            {/* search ride modal */}
            <SearchRideModal
                isOpen={openSearchModal}
                onClose={() => { setSearchModal(false) }
                }
                setIsLoading={setIsLoading}
                setRideList={setRideList}
            />

        </View>
    );
}

