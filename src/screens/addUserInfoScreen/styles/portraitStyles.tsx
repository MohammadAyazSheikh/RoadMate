
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';
import commonStyles from '../../../theme/commonStyles'
import { radius, spacing } from '../../../theme/spacing';

type p = (number: number) => number;



const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'flex-start',
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
        txtHeading: {
            color: colors.white1,
            fontSize: w(fontSize.size19),
            fontFamily: fontFamily.regular,
        },
        imgProfileView: {
            width: w(30),
            height: w(30),
            borderColor: colors.yellow1,
            borderWidth: 3,
            borderRadius: w(30),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imgStyle: {
            width: "100%",
            height: "100%",
            borderRadius: w(30),
            resizeMode: 'contain',

        },
        plusIconView: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.yellow1,
            borderColor: colors.grey3,
            borderWidth: 2,
            borderRadius: w(7),
            padding:3,
            position: 'absolute',
            top: "0%",
            right: "0%"
        },
        iconPlusStyle: {
            fontSize: w(5),
            color:colors.grey3,
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
        genderRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.grey2,
            width: w(95),
            height: 55,
            borderRadius: radius.radius1,
            paddingHorizontal: spacing.spacing1,
            marginVertical: 5,
        },
        genderView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        txtLabel: {
            color: colors.yellow1,
            fontFamily: fontFamily.regular,
            fontSize: w(fontSize.size7)
        },
        //text input

    });
}

export default portraitStyles;



