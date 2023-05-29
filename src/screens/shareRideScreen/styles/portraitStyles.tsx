
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
            justifyContent: 'space-evenly',
            alignItems: 'center',

        },
        scrollView: {
            width: w(100),
            alignItems: 'center'
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
    });
}

export default portraitStyles;



