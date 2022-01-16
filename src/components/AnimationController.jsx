import React, { useState } from 'react';
import styled from 'styled-components';

const EffectBox = styled.div`
    border: 1px solid #262626;
    background-color: #262626;
    box-shadow: -3px 3px 5px #000000;
    margin:10px 0px;
    padding: 10px;
    border-radius: 8px;
`;

const FieldContainer = styled.div`
    width:70%;
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    label{
        align-self: center;
    }
`;

const Field = styled.input`
    width: 300px;
    height: 30px;
`;

export const Action = styled.button`
    background-color: #FF0000;
    color:#FFFFFF;
    border: 1px solid #FF0000;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px;
    margin: 10px;
`;

const AnimationController = ({ effectType, removeAction, updateEffectData, effectId }) => {

    const [text, setText] = useState('Dummy Text');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [color, setColor] = useState('#FFFFFF');

    const onChange = (e, type) => {
        switch (type) {
            case 'text':
                setText(e.target.value);
                break;
            case 'startTime':
                setStartTime(e.target.value);
                break;
            case 'endTime':
                setEndTime(e.target.value);
                break;
            case 'color':
                setColor(e.target.value);
                break;
            default:
        }
        updateEffectData(type, effectId, e.target.value);
    }

    return (
        <EffectBox>
            <div style={{ color: '#FFFFFF', borderBottom: '1px solid #FFFFFF' }}> {effectType} effect</div>
            {effectType === 'Text' && <><FieldContainer>
                <label htmlFor={'text-input'}>Text</label>
                <Field id={'text-input'} type={'text'} value={text} onChange={(e) => onChange(e, 'text')} />
            </FieldContainer><FieldContainer>
                    <label htmlFor={'text-color'}>Text Color</label>
                    <input id={'text-color'} type={'color'} value={color} onInput={(e) => onChange(e, 'color')} />
                </FieldContainer></>
            }
            <FieldContainer>
                <label htmlFor={'start-input'}>Start At</label>
                <Field id={'start-input'} type={'number'} value={startTime} onChange={(e) => onChange(e, 'startTime')} />
            </FieldContainer>
            <FieldContainer>
                <label htmlFor={'end-input'}>End At</label>
                <Field id={'end-input'} type={'number'} value={endTime} onChange={(e) => onChange(e, 'endTime')} />
            </FieldContainer>
            <Action onClick={removeAction}>Remove Effect</Action>
        </EffectBox>
    )
};

export default AnimationController
