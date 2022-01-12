import React, { useState } from 'react';
import video from './assets/video.mp4';
import AnimatedTextComponent from './components/AnimatedTextComponent';
import styled from 'styled-components';
import AnimationController from './components/AnimationController';
import getUniqId from './getUniqId';


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

const Player = styled.video`
  width: 700px;
  height: 400px;
`;

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [effectList, setEffectList] = useState([{ id: getUniqId(), text: 'Dummy Text', startTime: 0, endTime: 0 }]);

  const onVideoPlayed = () => {
    setIsPlaying(true);
  }

  const onVideoEnded = () => {
    setIsPlaying(false);
  }

  const createAction = () => {
    setEffectList(prevState => [...prevState, { id: getUniqId(), text: 'Dummy Text', startTime: 0, endTime: 0 }]);
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
        {effectList.map(effect => <AnimatedTextComponent text={effect.text} startTime={effect.startTime} endTime={effect.endTime} isPlaying={isPlaying} />)}
        <Player src={video} controls onPlay={onVideoPlayed} onEnded={onVideoEnded} />
      </LeftPane>
      <RightPane>
        {effectList.map(effect => <AnimationController key={effect.id} effectId={effect.id} createAction={createAction} removeAction={() => { removeAction(effect.id) }} updateEffectData={updateEffectData} />)}
      </RightPane>
    </Container>
  );
}

export default App;
