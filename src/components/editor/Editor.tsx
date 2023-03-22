import React, {Dispatch, useState, KeyboardEvent} from 'react';
import './Editor.scss'
import {ActionsType, Notes} from "../../types/types";


type EditorType = {

    dispatch: Dispatch<ActionsType>
    n: Notes
}
export const Editor: React.FC<EditorType> = ({ n, dispatch}) => {

    const [title,setTitle]=useState(n.inputText)
    const updateNotes = () => {

        dispatch({type: 'UPDATE-NOTE', payload:{ id:n.id, title}})
        dispatch({type: 'TOGGLE-EDIT-MODE', payload: n.id})

    }

    const onChangeHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        setTitle(e.currentTarget.innerText)
    }

    return (
        <div>
            {n.editMode
                ? <div>
                    <div  className={"textReader"} onKeyUp={onChangeHandler} dangerouslySetInnerHTML={{__html: n.textWithHash}}
                         contentEditable={true} suppressContentEditableWarning={true}>
                    </div>
                    <button onClick={updateNotes}>Сохранить</button>
                </div>
                : <div className={'editSpan'}>{n.text}</div>
            }
        </div>
    );
};

