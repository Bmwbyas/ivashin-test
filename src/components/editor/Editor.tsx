import React, {Dispatch, useState, KeyboardEvent, useEffect} from 'react';
import './Editor.scss'
import {ActionsType, Note} from "../../types/types";


type EditorType = {

    dispatch: Dispatch<ActionsType>
    n: Note
}
export const Editor: React.FC<EditorType> = ({n, dispatch}) => {

    useEffect(() => {
        setTitle(n.inputText)
    }, [n.inputText])

    const [title, setTitle] = useState('')

    const updateNotes = () => {

        dispatch({type: 'UPDATE-NOTE', payload: {id: n.id, title}})
        dispatch({type: 'TOGGLE-EDIT-MODE', payload: {id: n.id}})

    }

    const onChangeHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        setTitle(e.currentTarget.innerText)
    }

    return (
        <div>
            {n.editMode
                ? <div>
                    <div className={"textReader"} onKeyUp={onChangeHandler}
                         dangerouslySetInnerHTML={{__html: n.textWithHash}}
                         contentEditable={true} suppressContentEditableWarning={true}>
                    </div>
                    <button onClick={updateNotes}>Сохранить</button>
                </div>
                : <div className={'editSpan'}>{n.text}</div>
            }
        </div>
    );
};

