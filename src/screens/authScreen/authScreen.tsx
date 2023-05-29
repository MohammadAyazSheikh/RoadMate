import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { useFunctionalOrientation } from '../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackProps } from '../../routes/rootNavigation';
import IconEn from 'react-native-vector-icons/Entypo';
import TextBox from '../../components/general/textBox/textBox';
import CustomButton from '../../components/general/customButton/customButton';
import { validEmail } from '../../utils/functions/validations';
import OtpModal from './otpModal';
import auth, { } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { fontStyle } from '../../theme/fonts';
import { authError, authSuccess, authLoading } from '../../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import colors from '../../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from '../../components/general/loader/loader';
import Toast from 'react-native-toast-message';

export default function Auth() {



    const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);


    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [emailErr, setEmailErr] = useState<string | null>(null);
    const [pass, setPass] = useState<string | null>(null);
    const [passErr, setPassErr] = useState<string | null>(null);





    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);



    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                <Image source={require('../../../assets/icons/logo.png')}
                    style={styles.iconStyle}
                />
                <View style={styles.headingView}>
                    <Text style={styles.txtHeading} >
                        Welcome Back...!
                    </Text>
                    <Text style={styles.txtHeading} >
                        Enter Your Credentials
                    </Text>
                </View>
                {/* =====Email=== */}
                <TextBox
                    icon={() => <IconEn name="email"
                        style={styles.inputIconStyle}
                    />}
                    keyboardType='email-address'
                    placeholder='Enter email'
                    value={email ? email : ''}
                    onChangeText={(value) => {

                        if (validEmail(value)) {
                            setEmailErr(null);
                        }
                        else {
                            setEmailErr("Invalid email");
                        }
                        if (!value) {
                            setEmailErr("email cannot be empty");
                        }
                        setEmail(value);
                    }}
                />
                {
                    emailErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {emailErr}
                    </Text>
                }
                {/* ===password==== */}
                <TextBox
                    icon={() => <IconEn name="key"
                        style={styles.inputIconStyle}
                    />}
                    placeholder='Enter password'
                    value={pass ? pass : ''}

                    onChangeText={(value) => {

                        if (value.length < 6) {
                            setPassErr("Password should be more than 5 characters long");
                        }
                        else {
                            setPassErr(null);
                        }

                        setPass(value);
                    }}
                />
                {
                    passErr && <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={styles.txtErr}
                    >
                        {passErr}
                    </Text>
                }
                <CustomButton
                    buttonText='Login'
                    disabled={(Boolean(emailErr || passErr || !pass || !email))}
                    onPress={() => {

                        //auth loading
                        dispatch(authLoading());

                        auth()
                            .signInWithEmailAndPassword(String(email), String(pass))
                            //if success
                            .then(async (data) => {

                                console.log("===Sign in data from firebase====");
                                console.log(JSON.stringify(data, null, 2));


                                //now getting data of user 
                                firestore()
                                    .collection('Users')
                                    .where('userId', '==', data.user.uid)
                                    .get()
                                    .then(user => {

                                        if (user.empty) {
                                            dispatch(authSuccess({
                                                email: data.user.email,
                                                userId: data.user.uid,
                                                firstName: null,
                                                lastName: null,
                                                gender: "male",
                                                dob: null,
                                                phoneNumber: null,
                                                profileImage: null
                                            }));
                                        }
                                        else {
                                            const userData = user.docs[0].data();

                                            console.log(userData)
                                            dispatch(authSuccess({
                                                email: data.user.email,
                                                userId: data.user.uid,
                                                firstName: userData.firstName,
                                                lastName: userData.lastName,
                                                gender: userData.gender,
                                                dob: userData.dob,
                                                phoneNumber: userData.phoneNumber,
                                                profileImage: userData.profileImage
                                            }));
                                        }
                                    })
                                    .catch(err => {
                                        console.error("Get User Error", err);
                                        dispatch(authError(String(err)));

                                        Toast.show({
                                            type: 'errorMsg',
                                            text1: 'Something went wrong',
                                            text2: `${err} 😐`,
                                            autoHide: true
                                        });
                                    });


                            })
                            .catch(error => {

                                if (error.code === 'auth/user-not-found') {
                                    dispatch(authError("That email address is already in use!"));
                                    console.log('That email address is already in use!');
                                    Toast.show({
                                        type: 'errorMsg',
                                        text1: 'Email not fround',
                                        text2: 'auth/user-not-found! 😐',
                                        autoHide: true
                                    });
                                }
                                else if (error.code === 'auth/invalid-email') {
                                    dispatch(authError("That email address is invalid!"));
                                    console.log('That email address is invalid!');
                                    Toast.show({
                                        type: 'errorMsg',
                                        text1: 'Invalid email',
                                        text2: 'That email address is invalid! 😐',
                                        autoHide: true
                                    });
                                }
                                else {
                                    dispatch(authError(error?.code));
                                    console.error(error);
                                    Toast.show({
                                        type: 'errorMsg',
                                        text1: 'Something went wrong',
                                        text2: `${error?.code} 😐`,
                                        autoHide: true
                                    });
                                }

                            });

                    }}
                />
                <TouchableOpacity
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.navigate("Registration")}
                >
                    <Text
                        allowFontScaling={fontStyle.fontScale}
                        numberOfLines={1}
                        style={[styles.txtErr, { color: colors.white1 }]}
                    >
                        Don't have an account? SIGN-UP HERE
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <Loader showLoader={user.isLoading}
                loadingText='Logging in..'
            />
        </View>
    );
}

