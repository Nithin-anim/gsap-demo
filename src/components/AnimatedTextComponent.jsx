import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const Text = styled.div`
    position: absolute;
    z-index: 11;
    top: 50%;
    left: 15%;
    width: 300px;
    height: 100px;
    font-size: 50px;
`;

const AnimatedTextComponent = ({ text, startTime, endTime, isPlaying, color, isPaused }) => {
    const textRef = useRef();
    const timelineRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            timelineRef.current = gsap.timeline()
                .to(textRef.current, { opacity: 1, delay: startTime })
                .to(textRef.current, { rotation: '+=360', duration: endTime })
                .to(textRef.current, { opacity: 0 });
        }
    }, [isPlaying, startTime, endTime, text]);

    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.paused(isPaused);
        }
    }, [isPaused])

    return (
        <>
            <Text ref={textRef} style={{ opacity: 0, color: color }}>{text}</Text >
        </>
    )
}



export default AnimatedTextComponent