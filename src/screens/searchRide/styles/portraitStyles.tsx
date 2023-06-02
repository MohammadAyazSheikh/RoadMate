
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";
import { fontFamily, fontSize } from '../../../theme/fonts';
import { getShadow } from '../../../theme/platformSpecificStyles';
import { spacing } from '../../../theme/spacing';


type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({
        // ====modal styles====
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            width: w(95),
            backgroundColor: colors.grey3,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: "hidden",
            ...getShadow({ elevation: 5, shadowOpacity: 5 }),
        },
        backDrop: {
            ...StyleSheet.absoluteFill,
            backgroundColor: "black",
            opacity: 0.8
        },
        scrollViewModal: {
            width: w(95),
            paddingHorizontal: 10,
            paddingBottom: 15,
            alignItems: 'center',
        },
        inputIconStyle: {
            color: colors.yellow1,
            fontSize: w(fontSize.size12),
            marginHorizontal: 5,
        },
        imgIconView: {
            width: w(30),
            aspectRatio: 1,
            borderRadius:100,
            borderColor:colors.yellow1,
            borderWidth:1,
            justifyContent:'center',
            alignItems:'center',
            marginVertical:10,
            backgroundColor:colors.grey2
        },
        imgIcon: {
            width: "70%",
            height:"70%"
        },
        txtErr: {
            color: colors.tomato,
            fontFamily: fontFamily.regular,
            fontSize: w(fontSize.size7)
        },
        btnModal: {
            width: "100%",
            height: 45,
            marginTop: 10,
            borderRadius: spacing.spacing1,
            backgroundColor: colors.yellow1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        // ======searchRide Screen Styles==========
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'space-evenly',
            alignItems: 'center',

        },
        scrollCard: {
            width: w(100),
            alignItems: 'center',
            paddingBottom: 20,
        },
        imgEmptyView: {
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.grey2
        },
        imgEmpty: {
            width: w(50),
            height: w(50),
            resizeMode: 'contain',
        },
        txtEmpty: {
            color: colors.white1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size9),
            marginTop: 10,
        },
    });
}

export default portraitStyles;



