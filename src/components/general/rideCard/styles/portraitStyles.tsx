
import { StyleSheet } from 'react-native';
import colors from "../../../../theme/colors";
import { fontFamily, fontSize } from '../../../../theme/fonts';
import { radius, spacing } from '../../../../theme/spacing';
import { getShadow } from '../../../../theme/platformSpecificStyles';

type p = (number: number) => number;

const portraitStyles = (w: p, h: p) => {

    return StyleSheet.create({


        cardView: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey3,
            ...getShadow({ elevation: 10 }),
            width: w(95),
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: radius.radius1,
            marginVertical:10,
        },
        row: {
            width: '100%',
            flexDirection: "row",
        },
        txtAvailable: {
            color: colors.yellow1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size7)
        },
        priceRow: {
            flexDirection: "row",
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            paddingVertical: 5,
        },
        txtPrice: {
            color: colors.white1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size12),
            marginRight: 5,
        },
        txtTime: {
            color: colors.white1,
            fontFamily: fontFamily.bold,
            fontSize: 20,
            marginRight: 5,
        },
        locationRow: {
            flexDirection: "row",
            width: '100%',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',

        },
        locationInnerRow: {
            flexDirection: "row",
            flex:1,
            height: 50,
        },
        dotView: {
            flexDirection: "column",
            justifyContent: 'space-between',
            alignItems: 'center',
            height: "100%"
        },
        line: {
            backgroundColor: colors.white1,
            paddingHorizontal: 1,
            height: 20,
            // marginVertical: 5,
        },
        dotOuter: {
            backgroundColor: "#3BB75C",
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        dot: {
            padding: 4,
            margin: 3,
            backgroundColor: colors.white1,
            borderRadius: 100,
            opacity: 0.8
        },
        locationTextView: {
            flex:1,
            height: "100%",
            justifyContent: "space-between",
            paddingLeft: 5
        },
        txtLocation: {
            color: colors.white1,
            fontFamily: fontFamily.bold,
            fontSize: w(fontSize.size7)
        },
        rowUserInfo: {
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 10,
        },
        imgView: {
            width: w(12),
            borderRadius: w(12),
            aspectRatio: 1,
            borderColor: colors.yellow1,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: 'center',
            marginRight:5,
        },
        img: {
            width: "100%",
            height: '100%',
            borderRadius: w(12),
            borderColor: colors.yellow1,
            borderWidth: 1
        },
        btn:{
            width:"100%",
            justifyContent:'center',
            alignItems:'center',
            marginTop:10,
            paddingVertical:10,
            borderRadius:radius.radius1,
            backgroundColor:colors.yellow1
        },
    });
}

export default portraitStyles;



