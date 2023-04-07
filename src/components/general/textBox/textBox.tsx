import React, { useState } from 'react';
import { View, TextInput, TextInputProps, ViewStyle } from 'react-native';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import responsiveStyles from './styles/styles';
import colors from '../../../theme/colors';


type inputProps = TextInputProps;

type textBoxProp = {
    iconPosition?: "left" | "right",
    inputViewStyle?: ViewStyle,
    inputViewFocusStyle?: ViewStyle,
    icon?: React.ComponentType,
} & inputProps // merging textInput props with my own props using &  "and"

const TextBox = ({ icon: Icon, iconPosition = "left", inputViewStyle = {}, inputViewFocusStyle = {},
    ...inputProps }: textBoxProp) => {

    const { styles } = useFunctionalOrientation(responsiveStyles);

    const [isFocused, setFocus] = useState(false);

    return (
        <View style={[
            styles.inputView,
            isFocused && styles.inputViewFocus,
            inputViewStyle, isFocused && inputViewFocusStyle]}>
            {iconPosition == "left" && Icon && <Icon />}
            <TextInput
               
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={[
                    styles.inputStyle,
                ]}
                placeholder='Enter Value'
                placeholderTextColor={colors.grey4}
                {...inputProps}
            />
            {iconPosition == "right" && Icon && <Icon />}
        </View>
    );

}

export default TextBox;