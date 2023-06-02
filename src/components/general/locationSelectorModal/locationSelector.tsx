import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Alert, Modal, StyleSheet, ViewProps, View, TouchableOpacity, ScrollView
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import Header from '../screenHeader/header';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import IconEn from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native-paper';
import { fontStyle } from '../../../theme/fonts';
import CustomButton from '../customButton/customButton';
import { locationType } from '../../../constants/types/sharedTypes';
import TextBox from '../textBox/textBox';
import { autoComplete, getCurrentLocation, getAddrFromCord } from '../../../utils/functions/getLocations';
import { debounce, toString } from 'lodash';
import { } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid'
import { getShadow } from '../../../theme/platformSpecificStyles';

const initialRegion = {
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
}


type typeLocationSelector = {
    isOpen: boolean,
    onClose: () => void,
    location?: locationType | null,
    setLocation?: (location: locationType) => void,
    centerViewProps?: ViewProps,
    modalViewProps?: ViewProps,
    backDropProps?: ViewProps,

}

const LocationSelector = ({
    isOpen,
    onClose,
    centerViewProps,
    modalViewProps,
    backDropProps,
    location,
    setLocation
}: typeLocationSelector) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);
    const [data, setData] = useState([]);
    const [text, setText] = useState<null | string>(null);
    const [coord, setCoord] = useState<object>(initialRegion);


    //setting current location when mount
    useEffect(() => {
        getCurrentLocation((location) => {
            setLocation && setLocation(location)
        })
    }, [])

    //animating to selected location
    const mapRef = useRef(null);
    useEffect(() => {
        console.log(JSON.stringify(location, null, 2))
        mapRef.current?.animateToRegion(
            {
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.0001,
            }
        )
    }, [location]);


    //handler for getting data
    const getSuggestion = useCallback(debounce(async (value) => {

        autoComplete(value)
            .then(data => {
                JSON.stringify(data, null, 3)
                setData(data?.features)
            }).catch(err => {
                console.error(err)
            })

    }, 300), []);

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
                        {/* header */}
                        <Header
                            onPressLeft={() => onClose()}
                            title='Select location'
                        />
                        {/* map container */}
                        <View style={styles.container}>
                            <MapView
                                ref={mapRef}
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                initialRegion={initialRegion}
                                zoomEnabled
                                rotateEnabled
                                onPress={
                                    (e) => {

                                        getAddrFromCord(
                                            {
                                                longitude: e.nativeEvent.coordinate.longitude,
                                                latitude: e.nativeEvent.coordinate.latitude,

                                            }
                                        ).then(data => {
                                            setLocation && setLocation({
                                                longitude: data?.longitude,
                                                latitude: data?.latitude,
                                                textAddr: data?.textAddr,
                                            })
                                        })


                                    }} >
                                <Marker coordinate={{
                                    ...initialRegion,
                                    longitude: location?.longitude,
                                    latitude: location?.latitude,
                                    // latitudeDelta: 0.0001,
                                    // longitudeDelta: 0.0001,

                                }} />

                            </MapView>
                            {
                                //view for blocking map scroll
                                (data?.length > 0) ?
                                    <View
                                        style={{
                                            backgroundColor: 'transparent',
                                            ...StyleSheet.absoluteFill
                                        }}
                                    />
                                    :
                                    null
                            }
                            {/*========= text box========== */}
                            <View style={styles.searchInputView}>
                                <TextBox
                                    inputViewStyle={{ ...getShadow({ elevation: 10 }) }}
                                    placeholder='Search location'
                                    value={text ? text : undefined}
                                    icon={() =>
                                        <TouchableOpacity
                                            onPress={() => {
                                                getCurrentLocation((location) => {
                                                    setLocation && setLocation(location)
                                                })
                                            }}
                                        >
                                            <IconEn
                                                name='location-pin'
                                                style={styles.inputIconStyle}
                                            />
                                        </TouchableOpacity>
                                    }

                                    onChangeText={(value) => {
                                        setText(value);

                                        getSuggestion(value);
                                        // console.log(value)
                                    }}
                                />
                            </View>
                            {/*======== suggestion ====*/}
                            {
                                (data?.length > 0 && text) ?

                                    <View style={styles.searchItemView}>
                                        <ScrollView
                                            contentContainerStyle={styles.scrollItemStyle}
                                        >
                                            {
                                                data?.map(item => (
                                                    <TouchableOpacity style={styles.txtView}
                                                        key={toString(uuid.v4())}
                                                        onPress={() => {
                                                            setLocation({
                                                                longitude: item?.properties?.lon,
                                                                latitude: item?.properties?.lat,
                                                                textAddr: item?.properties?.formatted,
                                                            });
                                                            setData([]);
                                                            console.log(JSON.stringify(item, null, 2))
                                                        }}
                                                    >
                                                        <Text
                                                            style={styles.txtSearch}
                                                            numberOfLines={1}
                                                            allowFontScaling={fontStyle.fontScale}
                                                        >
                                                            {item?.properties?.formatted}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </ScrollView>
                                    </View>
                                    : null
                            }
                            {/* button */}
                            <CustomButton
                                buttonText='Select'
                                onPress={onClose}
                            />
                        </View>

                    </View>
                </View>
            </Modal >

        </View >
    );
};
export default LocationSelector;