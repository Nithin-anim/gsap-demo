import React, { useState } from 'react';
import './App.css';
import video from './assets/video.mp4';
import AnimatedText from './components/AnimatedText';

const App = () => {
  const [text, setText] = useState('Dummy Text');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const onChange = (e, type) => {
    switch (type) {
      case 'text':
        setText(e.target.value);
        break;
      case 'start':
        setStartTime(e.target.value);
        break;
      case 'end':
        setEndTime(e.target.value);
        break;
      default:
    }
  }

  const onVideoPlayed = () => {
    setTimeout(() => {
      setShowAnimation(true);
    }, startTime * 1000);
  }

  const onVideoEnded = () => {
    setShowAnimation(false);
  }

  return (
    <div className="App">
      <h1>GSAP Demo</h1>
      <AnimatedText text={text} toggleAnimation={showAnimation} duartion={endTime} />
      <video className={'player'} src={video} autoPlay controls width={'700px'} height={'400px'} onPlay={onVideoPlayed} onEnded={onVideoEnded} />
      <div className={'field-container'}>
        <label htmlFor={'text-input'}>Text</label>
        <input id={'text-input'} className={'text-input'} type={'text'} value={text} onChange={(e) => onChange(e, 'text')} />
      </div>
      <div className={'field-container'}>
        <label htmlFor={'start-input'}>Start At</label>
        <input id={'start-input'} className={'text-input'} type={'number'} value={startTime} onChange={(e) => onChange(e, 'start')} />
      </div>
      <div className={'field-container'}>
        <label htmlFor={'end-input'}>End At</label>
        <input id={'end-input'} className={'text-input'} type={'number'} value={endTime} onChange={(e) => onChange(e, 'end')} />
      </div>
    </div>
  );
}

export default App;
