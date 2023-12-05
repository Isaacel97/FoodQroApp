import React from 'react'
import { db } from './firebaseConfig'
import { getUser } from './user'
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { constants } from '../utils/constants/constants';
import { callToast } from './commonFunctions';

export const addFavorite = async (restaurant) => {
    try {
        const user = await getUser();
        const userRef = doc(db, constants.FIREBASE.USERS, user.uid);
        const userDoc = await getDoc(userRef);
        const currentFavorites = userDoc.exists() ? userDoc.data().favoritos || {} : {};
        currentFavorites[restaurant] = true;
        await updateDoc(userRef, { 
            favoritos: currentFavorites 
        });
        callToast('Agregado a favoritos');
    } catch (e) {
        console.error('Error adding document: ', e);
        callToast('Error al agregar a favoritos');
    }
}

export const getFavorites = async () => {
    try {
        const user = await getUser();
        const userRef = doc(db, constants.FIREBASE.USERS, user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const favorites = userDoc.data().favoritos || {};
            return Object.keys(favorites);
        } else {
            callToast('Usuario no encontrado');
        }
    } catch (e) {
        console.error('Error adding document: ', e);
        return false;
    }
}

export const getFavorite = async (restaurant) => {
    try {
        const user = await getUser();
        const docRef = doc(db, constants.FIREBASE.USERS, user.uid );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const currentFavorites = docSnap.data().favoritos || {};
            if (currentFavorites[restaurant]) {
                return true;
            } 
        } 
        return false;
    } catch (e) {
        console.error('Error adding document: ', e);
        return false;
    }
}

export const deleteFavorite = async (restaurant) => {
    try {
        const user = await getUser();
        const userRef = doc(db, constants.FIREBASE.USERS, user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const currentFavorites = userDoc.data().favoritos || {};
            delete currentFavorites[restaurant];
            await updateDoc(userRef, { 
                favoritos: currentFavorites 
            });
            callToast('Eliminado de favoritos');
        } else {
            callToast('Usuario no encontrado');
        }
    } catch (e) {
        console.error('Error deletet document: ', e);
        callToast('Error al eliminar de favoritos');
    }
}