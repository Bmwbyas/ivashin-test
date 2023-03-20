import React, {ChangeEvent, useReducer} from 'react';
import {v1} from 'uuid';
import './App.scss';

type Notes = {
    id: string
    text: string,
    hash: string []
    editMode: boolean
}
type InitialStateType = typeof initialState
const initialState = {
    notes: [] as Notes[],
    createText: '',
    updateText: '',
};

type CreateType = {
    type: "CREATE",
}
type RemoveType = {
    type: "DELETE",
    payload: string
}
type SetCreateText = {
    type: 'SET-CREATE-TEXT',
    payload: string
}
type SetUpdateText = {
    type: 'SET-UPDATE-TEXT',
    payload: string
}
type ToggleEditMode = {
    type: 'TOGGLE-EDIT-MODE',
    payload: string
}
type UpdateNotes = {
    type: 'UPDATE-NOTE',
    payload: string
}
type ActionsType = CreateType
    | RemoveType
    | SetCreateText
    | ToggleEditMode
    | SetUpdateText
    | UpdateNotes


function reducer(state: InitialStateType = initialState, action: ActionsType) {
    switch (action.type) {
        case 'CREATE':
            let value = state.createText.split(' ');
            let hashs = [];
            let text = []
            for (let i = 0; i < value.length; i++) {

                if (value[i].charAt(0) === "#") {
                    hashs.push(value[i]);
                    text.push(value[i].substring(1))
                } else {
                    text.push(value[i])
                }

            }
            console.log(hashs)
            console.log(text)
            const note = {
                id: v1(),
                text: text.join(' ').trim(),
                hash: hashs,
                editMode:false
            }
            return {...state, notes: [...state.notes, note]};

        case 'DELETE':
            return {...state, notes: state.notes.filter(n => n.id !== action.payload)};

        case 'SET-CREATE-TEXT':
            return {...state, createText: action.payload};

        case 'SET-UPDATE-TEXT':
            return {...state, updateText: action.payload};

        case 'TOGGLE-EDIT-MODE':
            return {...state,
                notes:state.notes.map(n=>n.id===action.payload
                    ?{...n,editMode:!n.editMode}
                    :n)};

        case 'UPDATE-NOTE':{
            let value = state.updateText.split(' ');
            let hashs: string[] = [];
            let text: string[] = []
            for (let i = 0; i < value.length; i++) {

                if (value[i].charAt(0) === "#") {
                    hashs.push(value[i]);
                    text.push(value[i].substring(1))
                } else {
                    text.push(value[i])
                }

            }
            return {...state, notes: state.notes
                    .map(n=>n.id===action.payload
                        ?{...n,text: text.join(' ').trim(),hash: hashs}
                    :n)};
        }
        default:
            return state
    }
}


function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickHandler = () => {
        dispatch({type: 'CREATE'})
    }
    const onChangeCreateInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'SET-CREATE-TEXT', payload: e.currentTarget.value})
    }
    return (
        <div className={'App'}>
            <div className={'createNoteContainer'}>
                <input value={state.createText} onChange={onChangeCreateInput} type="text"/>
                <button onClick={onClickHandler}>Создать заметку</button>
            </div>
            <div className={'notesContainer'}>

                {state.notes.map(n => {

                    const removeNote = () => {
                        dispatch({type: 'DELETE', payload: n.id})
                    }
                    const toggleEditMode = () => {
                        dispatch({type: 'TOGGLE-EDIT-MODE',payload:n.id})
                    }
                    const updateNotes = () => {
                        dispatch({type: 'UPDATE-NOTE', payload: n.id})
                        dispatch({type:'TOGGLE-EDIT-MODE',payload:n.id})
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch({type: 'SET-UPDATE-TEXT', payload: e.currentTarget.value})
                    }
                    return <div key={n.id} className={'noteConteainer'}>
                        <div>
                            {n.editMode
                                ? <input value={state.updateText} onChange={onChangeHandler} onBlur={updateNotes}
                                         type="text"/>
                                : <span className={'editSpan'}>{n.text}</span>
                            }
                        </div>
                        <div>
                            {n.hash.map((h, index) => <div key={index}>{h}
                                <button>X</button>
                            </div>)}
                        </div>
                        <button onClick={removeNote}>удалить заметку</button>
                        <button onClick={toggleEditMode}>редактировать заметку</button>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
