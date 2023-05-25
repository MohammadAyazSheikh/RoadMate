import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import {
    useBlurOnFulfill,
    CodeField,
    useClearByFocusCell,
    Cursor
} from 'react-native-confirmation-code-field';
import { fontStyle } from '../../theme/fonts';
import CustomButton from '../../components/general/customButton/customButton';
import colors from '../../theme/colors';
import auth from '@react-native-firebase/auth';

type modalProps = {
    isOpen: boolean,
    onClose?: () => void,
   
}

const CELL_COUNT = 6;

const OtpModal = ({ isOpen, onClose }: modalProps) => {

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    const [timer, setTimer] = useState<null | number>(null);

    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

    //for code input
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        console.log(value)
    }, [value]);



   

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={() => {
                    onClose && onClose();
                }}>

                <View style={styles.backDrop} />
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.txtHeadingOtp} >
                            Enter OTP
                        </Text>
                        <Image
                            source={require('../../../assets/icons/padlock.png')}
                            style={styles.modalIconStyle}
                        />
                        <CodeField
                            ref={ref}
                            {...props}
                            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                        {/* ----resend------ */}
                        <TouchableOpacity style={styles.btnResend}
                            disabled={Boolean(timer)}
                            onPress={() => {
                                //setting timer for resend code
                                let time = 60;
                                const id = setInterval(() => {
                                    setTimer(time)
                                    time--;
                                }, 1000);

                                //clearing interval
                                setTimeout(() => {
                                    clearInterval(id);
                                    setTimer(null)
                                }, 1000 * 60);
                            }}
                        >
                            {
                                timer ?
                                    <Text style={styles.txtResend}
                                        allowFontScaling={fontStyle.fontScale}>
                                        Resend Code in
                                        <Text style={[styles.txtResend, { color: colors.yellow1 }]}
                                            allowFontScaling={fontStyle.fontScale}>
                                            {` ${timer}s`}
                                        </Text>
                                    </Text>
                                    :
                                    <Text style={styles.txtResend}
                                        allowFontScaling={fontStyle.fontScale}>
                                        Did not receive Code?
                                    </Text>
                            }
                        </TouchableOpacity>
                        <CustomButton
                            buttonText='Verify'
                            onPress={() => {
                           
                                // navigation.navigate("AddUserInfo");
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OtpModal;