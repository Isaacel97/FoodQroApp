import React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation from './TabNavigaton/TabNavigation';
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import logo from '../../../../assets/img/logo_fqa.png'
import colors from '../../../utils/styles/colors'

const AppNavigation = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name='TabNavInicioigation' 
        component={TabNavigation}
        options={{ 
          title: '',
          headerLeft: () => (
            <Image
              source={logo}
              style={{ width: 50, height: 50 }}
            />
          ),
          headerRight: () => (
            <>
              <AwesomeIcon name='search' size={25} color='black' style={{marginHorizontal: 8}}/>
              <AwesomeIcon name='heart' size={25} color={colors.primary} />
            </>
          ),
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation