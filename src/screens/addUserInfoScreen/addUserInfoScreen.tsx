import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMtc from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';
import { fontStyle } from '../../theme/fonts';
import { RadioButton } from 'react-native-paper'
import colors from '../../theme/colors';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import { validateName } from '../../utils/functions/validations';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserError, updateUserLoading, updateUserSuccess, userType ,authSuccess} from '../../redux/features/user/userSlice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loader from '../../components/general/loader/loader';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';


export default function AddUserInfo() {


    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [firstName, setFirstName] = useState<string | null>(user?.user?.firstName!);
    const [firstNameErr, setFirstNameErr] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(user?.user?.lastName!);
    const [lastNameErr, setLastNameErr] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(user?.user?.profileImage!);
    const [gender, setGender] = useState<"male" | "female">(user?.user?.gender!);
    const [dob, setDob] = useState<Date>(user?.user?.dob ? user?.user?.dob : new Date());

    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();



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

    const addInfo = (dataToPost: userType) => {

        console.log(JSON.stringify(dataToPost, null, 2));

        //saving in firebase
        firestore()
            .collection('Users')
            .add(dataToPost)
            .then(() => {
                dispatch(updateUserSuccess(dataToPost));

                // dispatch(authSuccess(dataToPost));
                Toast.show({
                    type: 'successMsg',
                    text1: 'Welcome To RoadMate',
                    text2: 'User Info added! 🥳',
                    autoHide: true
                });
                console.log('User Info added! 🥳');
            }).catch(err => {
                Toast.show({
                    type: 'errorMsg',
                    text1: 'Error',
                    text2: 'Facing error while adding user info 😐',
                    autoHide: true
                });
                dispatch(updateUserError(String(err)))
                console.error('User add Info failed', JSON.stringify(err));
            })
    }

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
            {/* ----profile Image */}
            <View style={styles.imgProfileView}>
                {
                    image || user.user?.profileImage ?
                        <Image
                            style={styles.imgStyle}
                            source={{ uri: image ? image : String(user.user?.profileImage) }}
                        />
                        :
                        <Image
                            style={styles.imgStyle}
                            source={require('../../../assets/icons/user.jpg')}
                        />
                }
                <TouchableOpacity
                    style={styles.plusIconView}
                    onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "photo",
                            multiple: false,
                        })
                            .then((image) => {
                                setImage(image.path);
                            })
                            .catch(err => console.log(err));
                    }}
                >
                    <IconAnt
                        name={image ? 'edit' : 'plus'}
                        style={styles.iconPlusStyle}
                    />
                </TouchableOpacity>
            </View>

            {/* ----First name---- */}
            <TextBox
                icon={() => <IconMtc name="card-account-details-outline"
                    style={styles.inputIconStyle}
                />}
                placeholder='First Name'
                value={firstName ? firstName : ""}
                onChangeText={(value) => {
                    setFirstName(value);
                    if (firstName) {
                        if (validateName(value)) {
                            setFirstNameErr(null)
                        }
                        else {
                            setFirstNameErr("Invalid name")
                        }
                    }
                    else {
                        setFirstNameErr("Please enter first name")
                    }
                }}
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
                value={lastName ? lastName : ""}
                onChangeText={(value) => {
                    setLastName(value);
                    if (lastName) {
                        if (validateName(value)) {
                            setLastNameErr(null)
                        }
                        else {
                            setLastNameErr("Invalid name")
                        }
                    }
                    else {
                        setLastNameErr("Please enter last name")
                    }
                }}
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
                buttonText='Add Info'
                disabled={Boolean(firstNameErr || lastNameErr)}
                onPress={async () => {
                    if (!firstName)
                        setFirstNameErr("Please enter first name");
                    if (!lastName)
                        setLastNameErr("Please enter last name");

                    if (firstName && lastName) {

                        dispatch(updateUserLoading());


                        const dataToPost: userType = {
                            email: user.user?.email ? user.user.email : "",
                            userId: user.user?.userId ? user.user.userId : "",
                            firstName: firstName,
                            lastName: lastName,
                            gender: gender,
                            dob: dob,
                            phoneNumber: "jh",
                            profileImage: user.user?.profileImage ? user.user?.profileImage : ""
                        };

                        //if user selects image
                        if (image) {
                            try {
                                const remotePath = `userFiles/images/${user.user?.email}/profileImages/${user.user?.email}${uuid.v4()}.jpg`;
                                console.log(image);
                                console.log(remotePath)

                                const reference = storage().ref(remotePath);

                                // uploads file
                                const task = await reference.putFile(image);

                                const url = await reference.getDownloadURL();

                                dataToPost.profileImage = url;
                                console.log(url)
                                addInfo(dataToPost);

                            }
                            catch (err) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: 'Facing error while adding user info 😐',
                                    autoHide: true
                                });
                                dispatch(updateUserError(String(err)))
                                console.error('Error while uploading image', JSON.stringify(err));
                            }
                        }
                        //adding user info without user image
                        else {

                            addInfo(dataToPost);

                        }
                    }

                }}
            />
            <Loader
                showLoader={user.updateUserLoading}
            />
        </View>
    );
}

