import React from 'react'
import LottieView from 'react-lottie-player'


const Loading = (props) => {
    return (
        <LottieView loop animationData={props.color} play style={{ width: '100%', height: '100%' }} speed={2}/>
    )
}

export default Loading