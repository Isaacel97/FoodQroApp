import React from 'react'
import LottieView from 'lottie-react-native';
import LottieLoading from '../animations/LottieLoading';

export default class Loading extends React.Component {
    render() {
        return (
            <LottieView
                source={LottieLoading}
                autoPlay
                loop
            />
        )
    }
}