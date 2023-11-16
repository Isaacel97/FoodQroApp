import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import { globalStyles } from '../../utils/styles'
import colors from '../../utils/styles/colors'

const Login = (props) => {
    const { setIsLogin } = props;
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: Yup.object({
        email: Yup.string().email('Email invalido').required('El email es obligatorio'),
        password: Yup.string().required('El password es obligatorio'),
        }),
        onSubmit: (formData) => {
            console.log(formData)
        }
    })
  return (
    <View>
        <TextInput 
            label='Email' 
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue('email', text)}
            value={formik.values.email}
            error={formik.errors.email}/>
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
                labelStyle={{
                    color: colors.secondary,
                    textDecorationLine: 'underline',
                    fontSize: 12,
                }}
                onPress={() => setIsLogin(false)}>
                Registrate!
            </Button>
        </View>
    </View>
  )
}

export default Login