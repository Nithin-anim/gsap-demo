import React, { useRef, useState } from 'react';
import video from './assets/video.mp4';
import AnimatedTextComponent from './components/AnimatedTextComponent';
import styled from 'styled-components';
import AnimationController, { Action } from './components/AnimationController';
import getUniqId from './getUniqId';
import AnimatedMediaComponent from './components/AnimatedMediaComponent';


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const LeftPane = styled.div`
  width: 60%;
  align-self: center;
  margin: 0px 20px;
`;

const RightPane = styled.div`
  width: 40%;
`;

export const Player = styled.video`
  width: ${props => props.videoWidth};
  height: ${props => props.videoHeight};
  `;

const PlayerContainer = styled.div`
  width: 700px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [effectList, setEffectList] = useState([]);
  const playerRef = useRef(null);

  const onVideoPlayed = () => {
    playerRef.current.play();
    setIsPlaying(true);
    setIsPaused(false);
  }

  const onVideoEnded = () => {
    setIsPlaying(false);
  }

  const onVideoPaused = () => {
    playerRef.current.pause();
    setIsPaused(true);
  }

  const createAction = (type = 'Text') => {
    const newEffect = type === 'Text' ? { id: getUniqId(), effectType: 'Text', text: 'Dummy Text', startTime: 0, endTime: 0, color: '#FFFFFF' } : { id: getUniqId(), effectType: type, startTime: 0, endTime: 0 };
    setEffectList(prevState => [...prevState, newEffect]);
  }

  const removeAction = (id) => {
    const effects = effectList;
    setEffectList([...effects.filter(e => e.id !== id)]);
  }

  const updateEffectData = (type, id, value) => {
    let effects = effectList;
    const index = effects.findIndex(effect => effect.id === id);
    if (index !== -1) {
      effects[index][type] = value;
      setEffectList([...effects])
    }
  }

  return (
    <Container>
      <LeftPane>
        <PlayerContainer>
          {effectList.map(effect => {
            if (effect.effectType === 'Text') {
              return <AnimatedTextComponent key={effect.id} text={effect.text} startTime={effect.startTime} endTime={effect.endTime} isPlaying={isPlaying} isPaused={isPaused} color={effect.color} />
            } else {
              return <AnimatedMediaComponent key={effect.id} startTime={effect.startTime} endTime={effect.endTime} isPlaying={isPlaying} isPaused={isPaused} type={effect.effectType} />
            }
          })}
          <Player src={video} controls onEnded={onVideoEnded} ref={playerRef} videoWidth={'700px'} videoHeight={'400px'} />
        </PlayerContainer>
        <Action onClick={onVideoPlayed}>Play</Action>
        <Action onClick={onVideoPaused} disabled={!isPlaying}>Pause</Action>
        <Action onClick={() => playerRef.current.currentTime = 0} disabled={!isPlaying}>Stop</Action>
      </LeftPane>
      <RightPane>
        <Action onClick={() => createAction()}>Add Text Effect</Action>
        <Action onClick={() => createAction('Image')}>Add Image</Action>
        <Action onClick={() => createAction('Video')}>Add Video</Action>
        {effectList.map(effect => <AnimationController key={effect.id} effectType={effect.effectType} effectId={effect.id} removeAction={() => { removeAction(effect.id) }} updateEffectData={updateEffectData} />)}
      </RightPane>
    </Container>
  );
}

export default App;
