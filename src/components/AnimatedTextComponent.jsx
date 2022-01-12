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
    color: #FF0000;
`;

const AnimatedTextComponent = ({ text, startTime, endTime, isPlaying }) => {
    const textRef = useRef();
    const timelineRef = useRef();

    useEffect(() => {
        if (isPlaying) {
            console.log('Rendered');
            timelineRef.current = gsap.timeline()
                .to(textRef.current, { opacity: 1, delay: startTime })
                .to(textRef.current, { rotation: '+=360', duration: endTime })
                .to(textRef.current, { opacity: 0 })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying, startTime, endTime, text])

    return (
        <>
            <Text ref={textRef} style={{ opacity: 0 }}>{text}</Text >
        </>
    )
}



export default AnimatedTextComponent