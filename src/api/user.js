import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';


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