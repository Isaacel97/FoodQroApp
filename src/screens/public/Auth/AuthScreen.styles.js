import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginTop: 30,
    resizeMode: 'contain',
    width: '100%',
    height: height * 0.3,
  },
});