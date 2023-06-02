
import { StyleSheet } from 'react-native';
import colors from "../../../../theme/colors";
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        container: {
            width: "100%",
            height: h(6),
            backgroundColor: colors.yellow1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        centerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        txtHeader: {
            color: colors.grey1,
            fontSize: w(fontSize.size9),
            fontFamily: fontFamily.bold
        },
        btnLeftContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            left: 5,
        },
        btnRightContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: "absolute",
            right: 5,
        },
    });
}

export default portraitStyles;



