import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../utils/styles/colors";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    image: {
        marginTop: 20,
        resizeMode: 'contain',
        width: '100%',
        height: height * 0.25,
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12,
        borderBottomColor: colors.secondaryLight,
        borderBottomWidth: 2,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    card: {
        backgroundColor: colors.greyLight,
        borderColor: 'black',
        borderWidth: 2,
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between', // Puedes ajustar esto según tus necesidades
        marginHorizontal: 16, // Ajusta el espaciado lateral según tus necesidades
        marginTop: 20, 
    },  
});