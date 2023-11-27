import React, {useState} from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, TextInput, Card } from 'react-native-paper'
import { logoutUser } from '../../../api/authApi'
import { globalStyles } from '../../../utils/styles'
import { styles } from './Account.styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import colors from '../../../utils/styles/colors'

const Account = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      nombre: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es valido')
        .required('El email es obligatorio'),
      nombre: Yup.string(),
    }),
    onSubmit: async(formData) => {
      console.log(formData);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required('La contraseña es obligatoria'),
      password: Yup.string()
        .required('La contraseña es obligatoria')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
      passwordConfirmation: Yup.string()
        .required('La contraseña es obligatoria')
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
    }),
    onSubmit: async(formData) => {
      console.log(formData);
    },
  });
  
  return (
    <ScrollView style={{marginTop: 50}}>
        <Card style={styles.card} mode='outlined'>
          <Card.Content>
            <TextInput
              label="Email"
              style={styles.input}
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              error={formik.errors.email}
              keyboardType='email-address'
              left={
                <TextInput.Icon 
                  icon='email'
                  color={colors.primary}/>
              }
            />

            {formik.errors.email && (
              <Text style={globalStyles.form.errorText}>{formik.errors.email}</Text>
            )}

            <TextInput
              label="Nombre"
              style={styles.input}
              onChangeText={formik.handleChange('nombre')}
              value={formik.values.nombre}
              error={formik.errors.nombre}
              left={
                <TextInput.Icon 
                  icon='account'
                  color='black'/>
              }
            />
            {formik.errors.nombre && (
                <Text style={globalStyles.form.errorText}>{formik.errors.nombre}</Text>
            )}
            <Button 
                mode='contained'
                style={styles.btnForm}
                labelStyle={{ color: 'white' }}
                onPress={formik.handleSubmit}>
                Actualizar datos
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode='outlined'>
          <Card.Title title="Password" />
          <Card.Content>
            <TextInput
              label="Contraseña actual"
              style={styles.input}
              onChangeText={formikPassword.handleChange('oldPassword')}
              value={formikPassword.values.oldPassword}
              error={formikPassword.errors.oldPassword}
              secureTextEntry={!showOldPassword}
              left={
                <TextInput.Icon 
                icon='lock'
                color={colors.primary}/>
              }
              right={
                <TextInput.Icon 
                icon={showOldPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowOldPassword(!showOldPassword)}/>
              }
            />
            {formikPassword.errors.oldPassword && (
                <Text style={globalStyles.form.errorText}>{formikPassword.errors.oldPassword}</Text>
            )}
            <TextInput
              label="Nueva contraseña"
              style={styles.input}
              onChangeText={formikPassword.handleChange('password')}
              value={formikPassword.values.password}
              error={formikPassword.errors.password}
              secureTextEntry={!showPassword}
              left={
                <TextInput.Icon 
                icon='lock'
                color='black'/>
              }
              right={
                <TextInput.Icon 
                icon={showPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowPassword(!showPassword)}/>
              }
            />
            {formikPassword.errors.password && (
                <Text style={globalStyles.form.errorText}>{formikPassword.errors.password}</Text>
            )}
            <TextInput
              label="Confirmar contraseña"
              style={styles.input}
              onChangeText={formikPassword.handleChange('passwordConfirmation')}
              value={formikPassword.values.passwordConfirmation}
              error={formikPassword.errors.passwordConfirmation}
              secureTextEntry={!showConfirmPassword}
              left={
                <TextInput.Icon 
                icon='lock'
                color={colors.primary}/>
              }
              right={
                <TextInput.Icon 
                icon={showConfirmPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}/>
              }
            />
            {formikPassword.errors.passwordConfirmation && (
                <Text style={globalStyles.form.errorText}>{formikPassword.errors.passwordConfirmation}</Text>
            )}
            <Button 
                mode='contained'
                style={styles.btnForm}
                labelStyle={{ color: 'white' }}
                onPress={formikPassword.handleSubmit}>
                Actualizar contraseña
            </Button>
          </Card.Content>
        </Card>
        <Button 
          mode='contained'
          style={globalStyles.form.buttonSubmit}
          labelStyle={{ color: 'white' }}
          onPress={logoutUser}>
            Cerrar sesión
        </Button>
    </ScrollView>
  )
}

export default Account