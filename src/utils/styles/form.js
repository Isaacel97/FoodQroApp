import { StyleSheet } from "react-native";
import colors from "./colors";

export const form = StyleSheet.create({
    input: {
        marginBottom: 24,
        marginHorizontal: 20,
    },
    errorText: {
        marginTop: -10,
        marginBottom: 10,
        marginHorizontal: 20,
        color: 'red',
        fontSize: 12,
    },
    buttonSubmit: {
        marginHorizontal: 16,
        padding: 5,
    },
    buttonText: {
        marginTop: 16,
    },
    labelButton: {
        color: colors.secondary,
        textDecorationLine: 'underline',
        fontSize: 12,
    },
    containerBtnText: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    textCheckBox: {
        fontSize: 12,
        marginStart: 20,
        marginEnd: 10
    },
    checkBox: {
        marginVertical: 20,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
    }
});