
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';
import { getShadow } from '../../../theme/platformSpecificStyles';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        scrollView: {
            width: w(100),
            alignItems: 'center'
        },
        headingView: {
            width: w(100),
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: "10%",
            paddingTop: "10%",
            marginBottom: 30
        },
        iconStyle: {
            width: w(45),
            height: w(45),
            resizeMode: 'contain',
        },
        txtHeading: {
            color: colors.yellow1,
            fontSize: w(fontSize.size19),
            fontFamily: fontFamily.fancy,
        },

        inputIconStyle: {
            color: colors.yellow1,
            fontSize: w(fontSize.size12),
            marginHorizontal: 5,
        },
        txtErr: {
            color: colors.tomato,
            fontFamily: fontFamily.regular,
            fontSize: w(fontSize.size7)
        },

        //----modal styles-----
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            width: "90%",
            backgroundColor: colors.grey2,
            borderRadius: 20,
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
            ...getShadow({ elevation: 10 }),
        },
        backDrop: {
            width: "100%",
            height: '100%',
            backgroundColor: "#000",
            opacity: 0.7,
            position: 'absolute',
            top: 0,
            left: 0
        },
        txtHeadingOtp: {
            color: colors.yellow1,
            fontSize: w(fontSize.size19),
            fontFamily: fontFamily.regular,
        },
        modalIconStyle: {
            width: w(45),
            height: w(45),
            resizeMode: 'contain',
            marginTop: 20,
        },
        txtResend: {
            color: colors.white1,
            fontSize: w(fontSize.size7),
            fontFamily: fontFamily.regular,
        },
        btnResend: {
            marginVertical: 5
        },

        //code input styles
        codeFieldRoot: {
            marginTop: 20,
            marginBottom: 10
        },
        cell: {
            marginHorizontal: 5,
            width: 40,
            paddingVertical: 10,
            fontSize: 20,
            borderWidth: 2,
            borderRadius: 3,
            borderColor: colors.grey4,
            textAlign: 'center',
            color: colors.yellow1
        },
        focusCell: {
            borderColor: colors.yellow1,
        },
    });
}

export default portraitStyles;



