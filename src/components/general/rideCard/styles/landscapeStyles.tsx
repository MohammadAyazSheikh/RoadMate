
import { StyleSheet } from 'react-native';
import colors from "../../../../theme/colors";
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius, spacing } from '../../../../theme/spacing';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p) => {

    return StyleSheet.create({

        //text input
        inputView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey2,
            width: w(95),
            height: 55,
            borderRadius: radius.radius1,
            paddingHorizontal: spacing.spacing1,
            marginVertical: 5,
        },
        inputViewFocus: {
            borderWidth: 1,
            borderColor: colors.yellow1,
        },
        inputStyle: {
            color: colors.yellow1,
            flex: 1,
            fontFamily: fontFamily.regular,
            fontSize: h(fontSize.size7)
        },
    });
}

export default landscapeStyles;



