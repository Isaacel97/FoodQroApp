import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast'
import { globalStyles } from '../../utils/styles'
import colors from '../../utils/styles/colors'
import { auth } from '../../api/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setIsLogin } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalido').required('El email es obligatorio'),
      username: Yup.string().required('El username es obligatorio').min(4, 'El username debe tener al menos 4 caracteres'),
      password: Yup.string().required('El password es obligatorio').min(8, 'El password debe tener al menos 8 caracteres'),
      confirmPassword: Yup.string().required('El password es obligatorio').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    }),
    onSubmit: (formData) => {
      console.log(formData)
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Toast.show('Usuario creado correctamente', {
          position: Toast.positions.CENTER,
        })
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('#ERROR: ', errorCode, errorMessage);
        Toast.show(errorMessage, {
          position: Toast.positions.CENTER,
        })
      });
    }
  })
  return (
    <View>
      <TextInput
        label='Email'
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email} />
      {formik.errors.email ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.email}</Text>
      ) : null}

      <TextInput
        label='Username'
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue('username', text)}
        value={formik.values.username}
        error={formik.errors.username} />
      {formik.errors.username ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.username}</Text>
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
            onPress={() => setShowPassword(!showPassword)} />
        } />
      {formik.errors.password ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.password}</Text>
      ) : null}
      
      <TextInput
        label='Confirmar Password'
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
        value={formik.values.confirmPassword}
        error={formik.errors.confirmPassword}
        secureTextEntry={!showConfirmPassword}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
        } />
      {formik.errors.confirmPassword ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.confirmPassword}</Text>
      ) : null}

      <Button
        mode='contained'
        style={globalStyles.form.buttonSubmit}
        labelStyle={{ color: 'white' }}
        onPress={formik.handleSubmit}>
        Registrarme
      </Button>

      <View style={globalStyles.form.containerBtnText}>
        <Text style={{ fontSize: 12, marginTop: 16 }}>¿Ya tienes cuenta?</Text>
        <Button
          mode='text'
          style={globalStyles.form.buttonText}
          labelStyle={{
            color: colors.secondary,
            textDecorationLine: 'underline',
            fontSize: 12,
          }}
          onPress={() => setIsLogin(true)}>
          Inicia sesión
        </Button>
      </View>
    </View>
  )
}

export default SignUp