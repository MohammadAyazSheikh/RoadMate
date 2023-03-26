import { Platform } from 'react-native';

export const getShadow = ({
    xOffset = 1,
    yOffset = 1,
    shadowColor = "#000",
    shadowOpacity = 1,
    shadowRadius = 5,
    elevation = 10,
}) => {
    if (Platform.OS === 'ios') {
        return {
            shadowColor: shadowColor,
            shadowOffset: { width: xOffset, height: yOffset },
            shadowOpacity,
            shadowRadius,
        };
    } else if (Platform.OS === 'android') {
        return {
            elevation,
            shadowColor: shadowColor,
        };
    }
};