import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedText = (props) => {
    const { text, toggleAnimation, duration } = props;
    const textRef = useRef();

    useEffect(() => {
        if (toggleAnimation) {
            debugger;
            gsap.to(textRef.current, { rotation: "+=360", duration: duration })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleAnimation])

    return (
        <>
            {toggleAnimation &&
                <div className={'animated-text'} ref={textRef}>{text}</div >}
        </>
    )
}



export default AnimatedText