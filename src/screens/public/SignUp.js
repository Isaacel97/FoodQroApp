import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { globalStyles } from '../../utils/styles'
import colors from '../../utils/styles/colors'
import { validAuth } from '../../api/authApi'
import Checkbox from 'expo-checkbox';

const SignUp = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setIsLogin } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      checkTerms: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalido').required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio').min(8, 'El password debe tener al menos 8 caracteres'),
      confirmPassword: Yup.string().required('El password es obligatorio').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
      checkTerms: Yup.boolean().oneOf([true], 'Debes aceptar los terminos y condiciones')
    }),
    onSubmit: async(formData) => {
      const res = await validAuth(formData.email, formData.password, 'signup')
      if (res) setIsLogin(true)
    }
  })
  return (
    <View>
      <TextInput
        label='Email'
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email} 
        left={
          <TextInput.Icon 
            icon='email'
            color={colors.primary} />
        }/>
      {formik.errors.email && formik.touched.email ? (
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
            onPress={() => setShowPassword(!showPassword)} />
        } 
        left={
          <TextInput.Icon 
            icon='lock'
            color='black'/>
        }/>
      {formik.errors.password && formik.touched.password ? (
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
        } 
        left={
          <TextInput.Icon 
            icon='lock'
            color={colors.primary}/>
        }/>
      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.confirmPassword}</Text>
      ) : null}

      <View style={globalStyles.form.checkBox}>
        <Checkbox
          value={formik.values.checkTerms}
          onValueChange={(value) => formik.setFieldValue('checkTerms', value)}
          color={formik.values.checkTerms ? colors.primary : undefined}
        />
        <Text style={globalStyles.form.textCheckBox}>Acepto los terminos y condiciones</Text>
      </View>
      {formik.errors.checkTerms ? (
        <Text style={globalStyles.form.errorText}>{formik.errors.checkTerms}</Text>
      ) : null}

      <Button
        mode='contained'
        style={globalStyles.form.buttonSubmit}
        labelStyle={{ color: 'white' }}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}>
        Registrarme
      </Button>

      <View style={globalStyles.form.containerBtnText}>
        <Text style={{ fontSize: 12, marginTop: 16 }}>¿Ya tienes cuenta?</Text>
        <Button
          mode='text'
          style={globalStyles.form.buttonText}
          labelStyle={globalStyles.form.labelButton}
          onPress={() => setIsLogin(true)}>
          Inicia sesión
        </Button>
      </View>
    </View>
  )
}

export default SignUp