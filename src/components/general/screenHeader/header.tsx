import React, { } from 'react';
import { View, Text, TextProps, TouchableOpacity, ViewProps } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import { Badge } from 'react-native-paper';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { fontStyle } from '../../../theme/fonts';
import colors from '../../../theme/colors';


type props = {
    containerProps?: ViewProps
    headingPosition?: "center" | "left" | "right",
    title?: string,
    titleProps?: TextProps,
    showLeftIcon?: boolean
    showRightIcon?: boolean,
    leftIcon?: React.ComponentType,
    rightIcon?: React.ComponentType,
    onPressRight?: () => void,
    onPressLeft?: () => void
}


const Header = ({
    containerProps,
    headingPosition = "center",
    title = "Screen",
    titleProps,
    showLeftIcon = true,
    showRightIcon = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onPressRight,
    onPressLeft
}: props) => {

    const { styles, isPortrait, heightToDp, widthToDp } = useFunctionalOrientation(responsiveStyles);


    return (
        <View style={styles.container}
            {...containerProps}
        >
            {/* left icon */}
            <TouchableOpacity style={styles.btnLeftContainer}
                onPress={onPressLeft && onPressLeft}
            >
                {
                    showLeftIcon ?
                        LeftIcon ?
                            <LeftIcon />
                            :
                            <IconAnt
                                name='left'
                                size={26}
                                color={colors.grey1}
                            />
                        : null
                }

                {
                    headingPosition == "left" ?
                        <Text
                            numberOfLines={1}
                            allowFontScaling={fontStyle.fontScale}
                            style={styles.txtHeader}
                            {...titleProps}
                        >
                            {title}
                        </Text>
                        :
                        null
                }
            </TouchableOpacity>
            {/* title */}
            {
                headingPosition == "center" ?
                    <Text
                        numberOfLines={1}
                        allowFontScaling={fontStyle.fontScale}
                        style={styles.txtHeader}
                        {...titleProps}
                    >
                        {title}
                    </Text>
                    :
                    null
            }
            {/* right icon */}
            <TouchableOpacity style={styles.btnRightContainer}
                onPress={onPressRight && onPressRight}
            >
                {
                    headingPosition == "right" ?
                        <Text
                            numberOfLines={1}
                            allowFontScaling={fontStyle.fontScale}
                            style={styles.txtHeader}
                            {...titleProps}
                        >
                            {title}
                        </Text>
                        :
                        null
                }
                {
                    showRightIcon ?
                        RightIcon ?
                            <RightIcon />
                            :
                            <IconAnt
                                name='right'
                                size={26}
                                color={colors.grey1}
                            />
                        :
                        null
                }
            </TouchableOpacity>
        </View>
    )
}
export default Header;

