import React from 'react'
import AuthScreen from './public/Auth/AuthScreen'
import AppNavigation from './private/AppNavigationTabs/AppNavigation';
import { useAuth } from '../hooks/useAuth';

const RootNavigation = () => {
  const { user } = useAuth();
  return user ? <AppNavigation/> : <AuthScreen />
}

export default RootNavigation