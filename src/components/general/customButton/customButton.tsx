import React, { useState } from 'react';
import {
    Text, TouchableOpacity, ActivityIndicator,
    TouchableOpacityProps, TextProps, ActivityIndicatorProps
} from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';



type btnProps = TouchableOpacityProps;

type buttonProps = {
    iconPosition?: "left" | "right",
    textProps?: TextProps,
    buttonText?: string,
    isLoading?: boolean,
    loaderPops?: ActivityIndicatorProps,
    icon?: React.ComponentType,
} & btnProps // merging touchableOpacity props with my own props using &  operator

const CustomButton = ({
    textProps,
    buttonText = "Button Text",
    icon: Icon,
    iconPosition = "right",
    isLoading = false,
    loaderPops,
    ...touchProps }: buttonProps) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    return (
        <TouchableOpacity style={styles.btnView}
            {...touchProps}
        >
            {
                Icon && iconPosition == "left" && <Icon />
            }
            <Text
                numberOfLines={1}
                style={styles.txtBtn}
                {...textProps}
            >
                {buttonText}
            </Text>
            {
                Icon && iconPosition == "right" && <Icon />
            }
            {
                isLoading && <ActivityIndicator
                    color={colors.grey2}
                    size={"small"}
                    style={{ marginLeft: 5 }}
                    {...loaderPops}
                />
            }
        </TouchableOpacity>
    );

}

export default CustomButton;