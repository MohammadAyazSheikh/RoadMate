
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';


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
            width: h(100),
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: "10%",
            paddingTop: "10%",
            marginBottom: 30
        },
        iconStyle: {
            width: h(45),
            height: h(45),
            resizeMode: 'contain',
        },
        txtHeading: {
            color: colors.yellow1,
            fontSize: h(fontSize.size19),
            fontFamily: fontFamily.fancy,
        },

        inputIconStyle: {
            color: colors.yellow1,
            fontSize: h(fontSize.size12),
            marginHorizontal: 5,
        },
        txtErr: {
            color: colors.tomato,
            fontFamily: fontFamily.regular,
            fontSize: h(fontSize.size7)
        },

    });
}

export default portraitStyles;



