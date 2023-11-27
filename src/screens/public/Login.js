import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { validAuth } from '../../api/authApi'
import { globalStyles } from '../../utils/styles'
import colors from '../../utils/styles/colors'

const Login = (props) => {
    const { setIsLogin } = props;
    const [showPassword, setShowPassword] = useState(false);
    
    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: Yup.object({
        email: Yup.string().email('Email invalido').required('El email es obligatorio'),
        password: Yup.string().required('El password es obligatorio'),
        }),
        onSubmit: async(formData) => {
            await validAuth(formData.email, formData.password, 'login');
           //console.log('RES LOGIN::: ',res.stsTokenManager.accessToken);
        }
    })
  return (
    <View>
        <TextInput 
            label='Email' 
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue('email', text)}
            keyboardType='email-address'
            value={formik.values.email}
            error={formik.errors.email}
            left={
                <TextInput.Icon 
                  icon='email'
                  color={colors.primary} />
            }/>
        {formik.errors.email ? (
            <Text style={globalStyles.form.errorText}>{formik.errors.email}</Text>
        ) : null}

        <TextInput
            label='Password'
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue('password', text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry={!showPassword}
            right={
                <TextInput.Icon 
                icon={showPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowPassword(!showPassword)}/>
            }
            left={
                <TextInput.Icon 
                  icon='lock'
                  color='black'/>
            }/>
        {formik.errors.password ? (
            <Text style={globalStyles.form.errorText}>{formik.errors.password}</Text>
        ) : null}

        <Button 
            mode='contained'
            style={globalStyles.form.buttonSubmit}
            labelStyle={{ color: 'white' }}
            onPress={formik.handleSubmit}>
            Iniciar sesión
        </Button>

        <View style={globalStyles.form.containerBtnText}>
            <Text style={{ fontSize: 12, marginTop: 16 }}>¿No tienes cuenta?</Text>
            <Button
                mode='text'
                style={globalStyles.form.buttonText}
                labelStyle={globalStyles.form.labelButton}
                onPress={() => setIsLogin(false)}>
                Registrate!
            </Button>
        </View>
    </View>
  )
}

export default Login