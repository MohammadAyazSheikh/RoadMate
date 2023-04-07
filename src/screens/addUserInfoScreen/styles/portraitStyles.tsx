
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



