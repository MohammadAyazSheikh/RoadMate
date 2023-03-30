
import { StyleSheet } from 'react-native';
import colors from "../../../../theme/colors";
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius, spacing } from '../../../../theme/spacing';

type p = (number: number) => number;

const landscapeStyles = (w: p, h: p) => {

    return StyleSheet.create({

        btnView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.yellow1,
            width: "95%",
            height: w(6.5),
            borderRadius: h(55) / 2,
            paddingHorizontal: spacing.spacing2,
            marginVertical: 5,
        },
        txtBtn: {
            color: colors.grey1,
            fontFamily: fontFamily.regular,
            fontSize: h(fontSize.size7)
        }
    });
}

export default landscapeStyles;



