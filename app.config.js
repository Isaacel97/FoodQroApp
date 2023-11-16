import 'dotenv/config';
export default {
  "expo": {
    "name": "FoodQroApp",
    "slug": "FoodQroApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.isacel97.FoodQroApp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.isacel97.FoodQroApp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "541831d9-ff80-4c28-b44d-e151d8be559c"
      },
      "firebase": {
          "apiKey": process.env.FIREBASE_API_KEY,
          "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
          "projectId": process.env.FIREBASE_PROJECT_ID,
          "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
          "messagingSenderId": process.env.FIREBASE_MESSAGING_SENDER_ID,
          "appId": process.env.FIREBASE_APP_ID,
          "measurementId": process.env.FIREBASE_MEASUREMENT_ID
      }
    }
  }
}
  