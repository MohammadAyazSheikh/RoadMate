
import { StyleSheet } from 'react-native';
import colors from "../../../../theme/colors";
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            backgroundColor: colors.yellow1,
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            ...getShadow({ elevation: 5, shadowOpacity: 5 })
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        txtLoading: {
            color: colors.grey1,
            fontSize: w(fontSize.size7),
            fontFamily:fontFamily.bold
        },
    });
}

export default portraitStyles;



