import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import styled from 'styled-components';
import Rocketman from './Rocketman';

const ElementContainer = styled.div`
    position: absolute;
    z-index: 11;
    left: 15%;
    top: 30%;
    width: 300px;
    height: 300px;
`;


const AnimatedMediaComponent = ({ text, startTime, endTime, isPlaying, color, isPaused }) => {
    const timelineRef = useRef(null);
    const elementRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            timelineRef.current = gsap.timeline()
                .to(elementRef.current, { opacity: 1, delay: startTime })
                .to(elementRef.current, { rotation: '+=360', duration: endTime })
                .to(elementRef.current, { opacity: 0 });
        }
    }, [isPlaying, startTime, endTime, text]);

    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.paused(isPaused);
        }
    }, [isPaused])

    return (
        <ElementContainer ref={elementRef} style={{ opacity: '0' }}>
            <Rocketman />
        </ElementContainer>
    )
}

export default AnimatedMediaComponent
