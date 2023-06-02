
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
            width: "100%",
            height: "100%",
            backgroundColor: colors.grey1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            ...getShadow({ elevation: 5, shadowOpacity: 5 })
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        container: {
            width: "100%",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        map: {
            ...StyleSheet.absoluteFill,
        },
        // search styles
        inputIconStyle: {
            color: colors.yellow1,
            fontSize: w(fontSize.size12),
            marginHorizontal: 5,
        },
        searchInputView: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 10,
        },
        searchItemView: {
            width: "95%",
            maxHeight: h(40),
            top: 80,
            position: 'absolute',
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: colors.grey2,
            ...getShadow({ elevation: 10 })
        },
        scrollItemStyle: {
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            width: '100%',
        },
        txtView: {
            width: "100%",
            paddingVertical: 10,
            borderColor: colors.yellow1,
            borderBottomWidth: 0.5,
        },
        txtSearch: {
            color: colors.white1,
            fontFamily: fontFamily.regular,
            fontSize: 14
        },
    });
}

export default portraitStyles;



