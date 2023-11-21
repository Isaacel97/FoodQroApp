import React, { useState } from 'react'
import { Platform, View, Image, KeyboardAvoidingView, Text } from 'react-native'
import { styles } from './AuthScreen.styles'
import logo from '../../../../assets/img/logo_fqa.png'
import Login from '../Login'
import SignUp from '../SignUp'

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <View style={styles.container}>
        <Image source={logo} alt='Logo' style={styles.image}/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {isLogin ? <Login setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
        </KeyboardAvoidingView>
    </View>
  )
}

export default AuthScreen