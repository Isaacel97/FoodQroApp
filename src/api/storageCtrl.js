import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../utils/constants/constants";

const setToken = async (token) => {
    try {
        await AsyncStorage.setItem(constants.STORAGE.TOKEN, token);
    } catch (error) {
        console.error("#ERROR: ", error);
    }
}

const getToken = async () => {
    try {
        return await AsyncStorage.getItem(constants.STORAGE.TOKEN);
    } catch (error) {
        console.error("#ERROR: ", error);
    }
}

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(constants.STORAGE.TOKEN);
    } catch (error) {
        console.error("#ERROR: ", error);
    }
}

export const storageCtrl = {
    setToken,
    getToken,
    removeToken,
}