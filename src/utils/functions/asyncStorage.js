import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {

    try {
        await AsyncStorage.setItem("@user", JSON.stringify(user))
        console.log("user saved in async storage")
    } catch (e) {
        console.log("user saved error async storage:", e)
    }
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        console.log("token cleared in async storage")
    } catch (e) {
        console.log("token cleared error async storage:", e)
    }
};

export const getUser = async () => {

    let userInfo;
    try {
        const jsonValue = await AsyncStorage.getItem('@user');
        userInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
        return userInfo;

    } catch (e) {
        console.log("get user from storage error:", e);
        return e;
    }
}

//localization
export const saveSelectedLang = async (lang) => {

    try {
        await AsyncStorage.setItem("@lang", JSON.stringify(lang))
        console.log("lang saved in async storage")
    } catch (e) {
        console.log("lang saved error async storage:", e)
    }
}


export const getSelectedLang = async () => {

    let lang;
    try {
        const jsonValue = await AsyncStorage.getItem('@lang');
        lang = jsonValue != null ? JSON.parse(jsonValue) : null;
        return lang;

    } catch (e) {
        console.log("get selected lang from storage error:", e);
        return e;
    }
}