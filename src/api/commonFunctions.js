import React from "react"
import Toast from 'react-native-root-toast';

export const callToast = (message) => {
    console.log('message', message);
    Toast.show(message, {
      position: Toast.positions.CENTER,
    })
}