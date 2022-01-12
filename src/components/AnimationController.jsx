import React, { useState } from 'react';
import styled from 'styled-components';

const EffectBox = styled.div`
    border: 1px solid #000000;
    padding: 10px;
`;

const FieldContainer = styled.div`
    width:70%;
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    label{
        align-self: center;
    }
`;

const Field = styled.input`
    width: 300px;
    height: 30px;
`;

const Action = styled.button`
    background-color: #FF0000;
    color:#FFFFFF;
    border: 1px solid #FF0000;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px;
    margin-right: 10px;
`;

const AnimationController = ({ createAction, removeAction, updateEffectData, effectId }) => {

    const [text, setText] = useState('Dummy Text');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

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
            default:
        }
        updateEffectData(type, effectId, e.target.value);
    }

    return (
        <EffectBox>
            <FieldContainer>
                <label htmlFor={'text-input'}>Text</label>
                <Field id={'text-input'} type={'text'} value={text} onChange={(e) => onChange(e, 'text')} />
            </FieldContainer>
            <FieldContainer>
                <label htmlFor={'start-input'}>Start At</label>
                <Field id={'start-input'} className={'text-input'} type={'number'} value={startTime} onChange={(e) => onChange(e, 'startTime')} />
            </FieldContainer>
            <FieldContainer>
                <label htmlFor={'end-input'}>End At</label>
                <Field id={'end-input'} className={'text-input'} type={'number'} value={endTime} onChange={(e) => onChange(e, 'endTime')} />
            </FieldContainer>
            <Action onClick={createAction}>Add Effect</Action>
            <Action onClick={removeAction}>Remove Effect</Action>
        </EffectBox>
    )
};

export default AnimationController
