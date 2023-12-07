import React from 'react';
import { db } from './firebaseConfig'
import { getUser } from './user'
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { constants } from '../utils/constants/constants';
import { callToast } from './commonFunctions';

export const addComment = async (restaurantId, comment) => {
    try {
        const user = await getUser();
        const restaurantRef = doc(db, constants.FIREBASE.RESTAURANTS, restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);
        const dataCooments = restaurantDoc.exists() ? restaurantDoc.data().comentarios || [] : [];
        
        dataCooments.push({
            comentario: comment,
            restaurante: restaurantId,
            usuario: user.displayName || 'Anónimo',
        });
        await setDoc(restaurantRef, { comentarios: dataCooments }, { merge: true });
        callToast('Czomentario agregado');
    } catch (e) {
        console.error('Error adding document: ', e);
        callToast('Error al agregar comentario');
    }
}

export const setLikes = async (type, action, restaurantId) => {
    try {
        const user = await getUser();
        const restaurantRef = doc(db, constants.FIREBASE.RESTAURANTS, restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);

        const userRef = doc(db, constants.FIREBASE.USERS, user.uid);
        const userDoc = await getDoc(userRef);
        let currentData, currentLikes;
        if (type === 'likes') {
            currentData = restaurantDoc.exists() ? restaurantDoc.data().likes || 0 : 0;
            currentLikes = userDoc.exists() ? userDoc.data().likes || {} : {};
        } else {
            currentData = restaurantDoc.exists() ? restaurantDoc.data().dislikes || 0 : 0;
            currentLikes = userDoc.exists() ? userDoc.data().dislikes || {} : {};
        }
        currentLikes[restaurantId] = true;
       
        const newValue = action === 'add' ? currentData + 1 : currentData - 1;
        await setDoc(restaurantRef, { [type]: newValue }, { merge: true });
        await setDoc(userRef, {
            [type]: currentLikes
        }, { merge: true });

        const message = action === 'add' ? 'agregado' : 'eliminado';
        callToast(type + ' ' + message);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

export const getLikes = async (restaurantId) => {
    try {
        const restaurantRef = doc(db, constants.FIREBASE.RESTAURANTS, restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);
        if (restaurantDoc.exists()) {
            const likes = restaurantDoc.data().likes || 0;
            const dislikes = restaurantDoc.data().dislikes || 0;
            return { likes, dislikes };
        } else {
            return { likes: 0, dislikes: 0 };
        }
    } catch (e) {
        console.error('Error adding document: ', e);
        callToast('Error al agregar obtener');
    }
}

export const getComments = async (restaurantId) => {
    try {
        const restaurantRef = doc(db, constants.FIREBASE.RESTAURANTS, restaurantId);
        const restaurantDoc = await getDoc(restaurantRef);
        if (restaurantDoc.exists()) {
            const comments = restaurantDoc.data().comentarios || [];
            return comments;
        } else {
            return [];
        }
    } catch (e) {
        console.error('Error adding document: ', e);
        callToast('Error al agregar comentario');
    }
}