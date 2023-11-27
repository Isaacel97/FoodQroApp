import { auth } from './firebaseConfig'
import { 
    onAuthStateChanged, 
    updateProfile,
    updatePassword
} from 'firebase/auth';


export const getUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                reject('No hay usuario logueado');
                alert('Error de autenticación, por favor vuelva a iniciar sesión');
            }
        });
    })
}

export const updateUser = (data) => {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        updateProfile(user, data)
            .then(() => {
                resolve('Usuario actualizado');
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const updatePasswordUser = (password) => {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        updatePassword(user, password)
            .then(() => {
                resolve('Contraseña actualizada');
            })
            .catch((error) => {
                reject(error);
            });
    })
}