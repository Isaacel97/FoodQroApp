import { StyleSheet } from "react-native";

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
    containerBtnText: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});