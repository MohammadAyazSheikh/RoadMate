import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, FlatList, ActivityIndicator, } from 'react-native';
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
import RideCard from '../../components/general/rideCard/rideCart';
import SearchRideModal from './searchRideModal';
import colors from '../../theme/colors';

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
                    rideList != null && rideList.length < 1 ?
                        <View style={styles.imgEmptyView}>
                            <Image
                                source={require('../../../assets/icons/search.png')}
                                style={styles.imgEmpty}
                            />
                            <Text
                                allowFontScaling={fontStyle.fontScale}
                                numberOfLines={1}
                                style={styles.txtEmpty}
                            >
                                Not ride found near you
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

