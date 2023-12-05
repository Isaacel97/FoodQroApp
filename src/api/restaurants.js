import React from 'react';
import { db } from './firebaseConfig'
import { getUser } from './user'
import { getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
            fecha: serverTimestamp(),
        });
        await updateDoc(userRef, { dataCooments });
        callToast('Comentario agregado');
    } catch (e) {
        console.error('Error adding document: ', e);
        callToast('Error al agregar comentario');
    }
}