import React, { useState } from 'react';
import {
    Alert, Modal, StyleSheet, ActivityIndicator, TextProps,
    ActivityIndicatorProps, ViewProps, View
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';
import { Text } from 'react-native-paper';
import { fontStyle } from '../../../theme/fonts';




type loaderType = {
    showLoader: boolean,
    loaderProps?: ActivityIndicatorProps,
    centerViewProps?: ViewProps,
    modalViewProps?: ViewProps,
    backDropProps?: ViewProps,
    loadingTextProps?: TextProps,
    loadingText?: string,
}

const Loader = ({
    showLoader,
    loaderProps,
    centerViewProps,
    modalViewProps,
    backDropProps,
    loadingTextProps,
    loadingText = "Loading...",

}: loaderType) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLoader}
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
                        <ActivityIndicator
                            color={colors.grey1}
                            size={"large"}
                            {...loaderProps}
                        />
                        {loadingText && < Text
                            style={styles.txtLoading}
                            allowFontScaling={fontStyle.fontScale}
                        >
                            {loadingText}
                        </Text>}
                    </View>
                </View>
            </Modal >

        </View >
    );
};
export default Loader;