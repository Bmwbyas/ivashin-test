import React, {ChangeEvent, memo} from 'react';
import './CreateComponent.scss'

type CreateComponentType={
    value:string
    onChange:(e: ChangeEvent<HTMLTextAreaElement>)=>void
    onClick:()=>void
    buttonName:string
}

const CreateComponent:React.FC<CreateComponentType> = memo(({value,onClick,onChange,buttonName}) => {

    return (
        <div>
            <textarea value={value} onChange={onChange}/>
            <button onClick={onClick}>{buttonName}</button>
        </div>
    );
});

export default CreateComponent;
