import React from 'react'
import AuthScreen from './public/Auth/AuthScreen'
import AppNavigation from './private/AppNavigationTabs/AppNavigation';
import { useAuth } from '../hooks/useAuth';

const RootNavigation = () => {
    console.log('RootNavigation.js');
    const { user } = useAuth();
  return user ? <AppNavigation/> : <AuthScreen />
}

export default RootNavigation