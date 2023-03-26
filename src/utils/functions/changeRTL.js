import RNRestart from "react-native-restart";
import { I18nManager } from "react-native";

export const changeRTL = async (isRTL) => {
    //changing language based on what was chosen
    I18nManager.allowRTL(true);
    if (isRTL) {
        I18nManager.forceRTL(true);
    } else {
        I18nManager.forceRTL(false);
    }
  
    RNRestart.Restart();
};



