import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import {
	useFonts,
	Nunito_300Light,
	Nunito_400Regular,
	Nunito_700Bold,

} from '@expo-google-fonts/nunito';
import colors from './src/utils/styles/colors';
import RootNavigation from './src/screens/RootNavigation';

export default function App() {
  // const environment = process.env.NODE_ENV
  // console.log('Modo', environment)
  const theme = {
    ...MD3LightTheme,
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
    },
  };

  let [fontsLoaded] = useFonts({
		Nunito_300Light,
		Nunito_400Regular,
		Nunito_700Bold,
	});
  
  return !fontsLoaded ? (null) : (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <StatusBar style='dark' backgroundColor={colors.primary}/>
        <RootNavigation />
      </PaperProvider>
    </AuthProvider>
  );
}
