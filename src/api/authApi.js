import React from 'react'
import { auth } from './firebaseConfig'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import Toast from 'react-native-root-toast'

const callToast = (message) => {
    Toast.show(message, {
        position: Toast.positions.CENTER,
    })
}

/**
 * @description dependiendo del tipo de autenticacion, crea o loguea al usuario
 * @param {string} email email del usuario
 * @param {string} pass contraseña del usuario
 * @param {string} type tipo de autenticacion, login o signup
 * @returns {object} user | false
*/    
export const validAuth = async(email, pass, type) => {
    if(type !== 'login' && type !== 'signup') throw new Error('Tipo de autenticacion invalido');
    try {
        let userCredential, message;
        if(type === 'login'){
            userCredential = await signInWithEmailAndPassword(auth, email, pass);
            message = 'Usuario logueado correctamente';
        } else {
            userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            message = 'Usuario creado correctamente';
        }
        const user = userCredential.user;
        callToast(message);
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('#ERROR: ', errorCode, errorMessage);
        const errorMessages = {
            'auth/email-already-in-use': 'El email ya está en uso',
            'auth/wrong-password': 'La contraseña es incorrecta',
            'auth/invalid-email': 'El email es invalido',
            'auth/user-not-found': 'El usuario no existe',
            'auth/weak-password': 'La contraseña es muy debil',
            'auth/too-many-requests': 'Demasiadas solicitudes, intenta mas tarde',
            'auth/operation-not-allowed': 'Operacion no permitida',
            'auth/network-request-failed': 'Error de red',
        };
        const message = errorMessages[errorCode] || `Error desconocido: ${errorCode} - ${errorMessage}`;
        callToast(message);
        return false;
    }
}

/**
 * @description cierra la sesion del usuario
 */
export const logoutUser = async() => {
    try {
        await signOut(auth);
        callToast('Cierre de sesion correcto');
        return true;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('#ERROR: ', errorCode, errorMessage);
        const message = `Error: ${errorCode} - ${errorMessage}`;
        callToast(message);
        return false;
    }
}
