
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
            alignItems: 'center',
            paddingBottom: 15,
        },

        imgIconView: {
            width: w(50),
            aspectRatio: 1,
            borderColor: colors.yellow1,
            borderWidth: 3,
            marginVertical: 30,
            borderRadius: w(50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey3
        },
        imgIcon: {
            width: "70%",
            height: "70%",
            resizeMode: 'contain',
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



