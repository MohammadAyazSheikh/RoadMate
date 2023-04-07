import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';
import { fontStyle } from '../../theme/fonts';
import { RadioButton } from 'react-native-paper'
import colors from '../../theme/colors';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';


export default function AddUserInfo() {

    const [firstName, setFirstName] = useState(null);
    const [firstNameErr, setFirstNameErr] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [lastNameErr, setLastNameErr] = useState(null);

    const [gender, setGender] = useState<"male" | "female">("male");

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();

    const [dob, setDob] = useState<Date>(new Date());

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setDob(currentDate!);
    };

    const showDate = () => {
        DateTimePickerAndroid.open({
            value: dob,
            onChange,
            mode: "date",
            is24Hour: true,
        });
    };



    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);

    return (
        <View style={styles.container}>

            <View style={styles.headingView}>
                <Text style={styles.txtHeading} >
                    Enter Your
                </Text>
                <Text style={styles.txtHeading} >
                    Details
                </Text>
            </View>
            {/* ----First name---- */}
            <TextBox
                icon={() => <IconMtc name="card-account-details-outline"
                    style={styles.inputIconStyle}
                />}
                placeholder='First Name'
            />
            {
                firstNameErr && <Text
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                    style={styles.txtErr}
                >
                    {firstNameErr}
                </Text>
            }
            {/* -----Last Name------ */}
            <TextBox
                icon={() => <IconMtc name="card-account-details-outline"
                    style={styles.inputIconStyle}
                />}
                placeholder='Last Name'
            />
            {
                lastNameErr && <Text
                    allowFontScaling={fontStyle.fontScale}
                    numberOfLines={1}
                    style={styles.txtErr}
                >
                    {lastNameErr}
                </Text>
            }
            {/* -------gender----- */}
            <View style={styles.genderRow}>
                <View style={styles.genderView}>
                    <IconMtc name="gender-male"
                        style={styles.inputIconStyle}
                    />
                    <Text style={styles.txtLabel}>
                        Male
                    </Text>
                    <RadioButton
                        value='male'
                        status={gender == "male" ? "checked" : "unchecked"}
                        onPress={() => setGender("male")}
                        color={colors.yellow1}
                    />
                </View>
                <View style={styles.genderView}>
                    <IconMtc name="gender-female"
                        style={styles.inputIconStyle}
                    />
                    <Text style={styles.txtLabel}>
                        Female
                    </Text>
                    <RadioButton
                        value='female'
                        status={gender == "female" ? "checked" : "unchecked"}
                        onPress={() => setGender("female")}
                        color={colors.yellow1}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.genderRow,
            { justifyContent: 'center', alignItems: 'center' }]}
                onPress={() => { showDate() }}
            >
                <View style={styles.genderView}>
                    <IconMtc name="calendar-month"
                        style={styles.inputIconStyle}
                    />
                    <Text style={styles.txtLabel}>
                        {`Date of birth:   ${moment(dob).format("DD-MMM-YYYY")}`}
                    </Text>
                </View>
            </TouchableOpacity>
            <CustomButton
                buttonText='Submit'
            />
        </View>
    );
}
