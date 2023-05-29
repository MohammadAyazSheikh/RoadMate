
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
            alignItems: 'center'
        },
        cardStyle: {
            width: w(90),
            height: h(40),
            borderRadius: 15,
            ...getShadow({ elevation: 10, shadowRadius: 5 }),
            backgroundColor: colors.grey3,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            paddingBottom:20,
    
        },
        animView:{
            width:'100%',
            flex:1,
        },
        txtCard:{
            fontFamily:fontFamily.bold,
            color:colors.white1,
            fontSize:w(fontSize.size10)
        },
    });
}

export default portraitStyles;



