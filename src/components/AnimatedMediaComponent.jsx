import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import styled from 'styled-components';
import Rocketman from './Rocketman';
import { Player } from '../App';
import videoAssest from '../assets/video-effect.mp4';

const ElementContainer = styled.div`
    position: absolute;
    z-index: 11;
    left: 15%;
    top: 30%;
    width: 300px;
    height: 300px;
`;


const AnimatedMediaComponent = ({ type, startTime, endTime, isPlaying, isPaused }) => {
    const timelineRef = useRef(null);
    const elementRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            if (type === 'Video') {
                timelineRef.current = gsap.timeline()
                    .to(elementRef.current, { opacity: 1, delay: startTime })
                    .call(playVideo)
                    .to(elementRef.current, { opacity: 0, duration: endTime });
            } else {
                timelineRef.current = gsap.timeline()
                    .to(elementRef.current, { opacity: 1, delay: startTime })
                    .to(elementRef.current, { rotation: '+=360', duration: endTime })
                    .to(elementRef.current, { opacity: 0 });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, startTime, endTime]);

    const playVideo = () => {
        elementRef.current.children[0].play();
    }

    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.paused(isPaused);
        }
    }, [isPaused])

    return (
        <ElementContainer ref={elementRef} style={{ opacity: '0' }}>
            {type === 'Image' ? <Rocketman /> : <Player src={videoAssest} videoWidth={'400px'} videoHeight={'200px'} />}
        </ElementContainer>
    )
}

export default AnimatedMediaComponent
