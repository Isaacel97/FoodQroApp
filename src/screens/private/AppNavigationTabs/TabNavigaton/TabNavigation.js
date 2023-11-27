import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../../home/Home'
import Favorites from '../../favorite/Favorites'
import Account from '../../account/Account'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from '../../../../utils/styles/colors'
import { constants } from '../../../../utils/constants/constants'

const TabNavigation = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: (routeStatus) => setIcon(route, routeStatus)
         })}>
            <Tab.Screen 
                name={constants.SCREENS.HOME}
                component={Home}
                options={{ 
                    title: 'Restaurantes',
                    headerTransparent: true,
                }}
            />
            <Tab.Screen 
                name={constants.SCREENS.FAVORITES}
                component={Favorites} 
                options={{ 
                    title: 'Favoritos',
                    headerTransparent: true,
                }}
            />
            <Tab.Screen 
                name={constants.SCREENS.ACCOUNT} 
                component={Account} 
                options={{ 
                    title: 'Cuenta',
                    headerTransparent: true,
                }}
            />
        </Tab.Navigator>
    )
}

const setIcon = (route, routeStatus) => {
    let iconName
    const color = routeStatus.focused ? colors.primary : '#000'
    switch (route.name) {
        case 'Home':
            iconName = 'home'
            break;
        case 'Favorites':
            iconName = 'heart'
            break;
        case 'Account':
            iconName = 'user'
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} size={25} color={color} />
}

export default TabNavigation