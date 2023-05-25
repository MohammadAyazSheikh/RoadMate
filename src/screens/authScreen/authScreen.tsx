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

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);



    const { styles, heightToDp: h, widthToDp: w } = useFunctionalOrientation(responsiveStyles);


    // Handle user state changes
    function onAuthStateChanged(user: object) {

        console.log("===auth state change=====");
        console.log(JSON.stringify(user, null, 2));
        // setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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
                            .then((data) => {

                                console.log("===Sign in data====");
                                console.log(JSON.stringify(data, null, 2));

                                dispatch(authSuccess({
                                    email: data.user.email,
                                    uid: data.user.uid,
                                    firstName: null,
                                    lastName: null,
                                    gender: null,
                                    dob: null,
                                    phoneNumber: null
                                }));

                                console.log("login success..!");
                            })
                            .catch(error => {

                                if (error.code === 'auth/email-already-in-use') {
                                    dispatch(authError("That email address is already in use!"));
                                    console.log('That email address is already in use!');
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Try new email',
                                        text2: 'That email address is already in use! 😐',
                                        autoHide:true
                                    });
                                }
                                else if (error.code === 'auth/invalid-email') {
                                    dispatch(authError("That email address is invalid!"));
                                    console.log('That email address is invalid!');
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Invalid email',
                                        text2: 'That email address is invalid! 😐',
                                        autoHide:true
                                    });
                                }
                                else {
                                    dispatch(authError(error?.code));
                                    console.error(error);
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Something went wrong',
                                        text2: `${error?.code} 😐`,
                                        autoHide:true
                                    });
                                }

                            });

                    }}
                />
                <TouchableOpacity
                    style={{ marginTop: 10 }}
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

