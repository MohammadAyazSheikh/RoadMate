// import { main, mainLight } from '../../../utils/colors';
import { StyleSheet } from 'react-native';
import colors from "../../../theme/colors";

type p = (number: string) => number;

const landscapeStyles = (w: p, h: p) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.grey1,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });
}


export default landscapeStyles;

