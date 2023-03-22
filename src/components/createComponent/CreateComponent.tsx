import React, {memo, useState} from 'react';
import './CreateComponent.scss'

type CreateComponentType = {
    onClick: (value: string) => void
    buttonName: string
}

const CreateComponent: React.FC<CreateComponentType> = memo(({onClick, buttonName}) => {
    const [value, setValue] = useState('')
    const onClickHandler = () => {
        onClick(value)
        setValue('')
    }
    return (
        <div className={'createContainer'}>
            <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
            <button onClick={onClickHandler} disabled={value.trim() === ''}>{buttonName}</button>
        </div>
    );
});

export default CreateComponent;
