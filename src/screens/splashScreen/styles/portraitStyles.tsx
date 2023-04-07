
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';
import commonStyles from '../../../theme/commonStyles'

type p = (number: number) => number;



const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        logoView: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        textLogo: {
            color: colors.yellow1,
            fontSize: w(fontSize.size19*1.5),
            fontFamily: fontFamily.fancy,
        },
    });
}

export default portraitStyles;



