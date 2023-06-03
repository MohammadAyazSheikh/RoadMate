
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';
import { getShadow } from '../../../theme/platformSpecificStyles';
import { radius } from '../../../theme/spacing';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 30
        },
        scrollView: {
            width: w(100),
            alignItems: 'center',
            paddingBottom: 250
        },
        row: {
            width: w(95),
            paddingVertical: 10,
            borderRadius: radius.radius3,
            backgroundColor: colors.grey3,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            marginVertical: 10,
            ...getShadow({ elevation: 10 })
        },
        row2: {
            width: w(95),
            paddingVertical: 10,
            borderRadius: radius.radius3,
            // backgroundColor: colors.grey3,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
        },
        fieldRow: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        imageView: {
            borderColor: colors.yellow1,
            borderWidth: 2,
            width: w(20),
            aspectRatio: 1,
            borderRadius: w(20),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10
        },
        imgStyle: {
            width: '100%',
            height: '100%',
            borderRadius: w(20),
        },
        txtName: {
            fontFamily: fontFamily.bold,
            color: colors.white1,
            fontSize: w(fontSize.size9)
        },
        btnStyle: {
            paddingVertical: 10,
            width: w(95),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.yellow1,
            borderRadius: radius.radius1
        },
        imgEmptyView: {
            height: '70%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imgEmpty: {
            width: w(50),
            height: w(50),
            resizeMode: 'contain',

        },
    });
}

export default portraitStyles;



